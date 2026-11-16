import fs from 'node:fs';import ts from 'typescript';
let s=fs.readFileSync('app/page.tsx','utf8');
s=s.replace("import JsBarcode", "import {translate} from './i18n';\nimport JsBarcode");
s=s.replace('export default function App(){',`export default function App(){const [lang,L]=useState('en');const t=(v:string)=>translate(v,lang);useEffect(()=>{const saved=localStorage.getItem('cml-language');if(saved==='ar')L('ar')},[]);useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('cml-language',lang)},[lang]);`);
s=s.replace('<span>C</span><div>Colors<small>MEDICAL LABORATORY</small></div>','<img className="cml-logo" src="/cml-logo.png" alt="Colors Medical Laboratories"/><div>C.M.L<small>Colors Medical Laboratories</small></div>');
s=s.replace('<div className="identity">','<button type="button" className="language-toggle" aria-label="Switch language / تغيير اللغة" onClick={()=>L(lang===\'en\'?\'ar\':\'en\')}>{lang===\'en\'?\'العربية\':\'English\'}</button><div className="identity">');
s=s.replace("{tab==='Settings'&&<>","{tab==='Settings'&&<><div className=\"panel\"><h2>Desktop transition</h2><p>The current build is a preview. The target is an installed Windows app on the laboratory network.</p><p>One laboratory server will hold the shared database and PDF files. Local user accounts and tested backup recovery are required before rollout.</p><p>External partner access will require a separately secured gateway.</p></div>");
// Keep machine values in English: only labels are translated.
s=s.replace(/<option key=\{([ovx])\}>\{\1\}<\/option>/g,'<option key={$1} value={$1}>{t($1)}</option>');
s=s.replace(/<option>(Document|Result|CBC|Flow Cytometry|ID)<\/option>/g,'<option value="$1">$1</option>');
for(const x of ['label','name','tab','k','x.status','c.status','selected.status','x.direction','f.category','m.role','form.kind','error'])s=s.replaceAll('{'+x+'}','{t(String('+x+'))}');
s=s.replace("{user?.role||'Sign-in required'}","{t(user?.role||'Sign-in required')}");
// Translate ternary/fallback display expressions, never comparison or stored values.
const ast=ts.createSourceFile('page.tsx',s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];
function walk(n){if(ts.isJsxText(n)&&n.text.trim()&&/[A-Za-z]/.test(n.text)){const value=n.text.replace(/\s+/g,' ').trim();edits.push([n.pos,n.end,'{t('+JSON.stringify(value)+')}']);}else if(ts.isJsxAttribute(n)&&n.name.text==='placeholder'&&n.initializer&&ts.isStringLiteral(n.initializer)){edits.push([n.initializer.pos,n.initializer.end,'{t('+JSON.stringify(n.initializer.text)+')}']);}else if(ts.isJsxExpression(n)&&!ts.isJsxAttribute(n.parent)&&n.expression&&(ts.isConditionalExpression(n.expression)||ts.isBinaryExpression(n.expression))){const e=n.expression;const raw=e.getText(ast);if(!raw.includes('<')&&!raw.includes('&&')&&(ts.isConditionalExpression(e)||e.operatorToken.kind===ts.SyntaxKind.BarBarToken))edits.push([e.getStart(ast),e.end,'t(String('+raw+'))']);}
ts.forEachChild(n,walk)}walk(ast);for(const [a,b,v]of edits.sort((a,b)=>b[0]-a[0]))s=s.slice(0,a)+v+s.slice(b);fs.writeFileSync('app/page.tsx',s);
