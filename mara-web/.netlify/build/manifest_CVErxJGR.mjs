import 'kleur/colors';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_C1gO1D2m.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/andrejs/mara-web/","cacheDir":"file:///Users/andrejs/mara-web/node_modules/.astro/","outDir":"file:///Users/andrejs/mara-web/dist/","srcDir":"file:///Users/andrejs/mara-web/src/","publicDir":"file:///Users/andrejs/mara-web/public/","buildClientDir":"file:///Users/andrejs/mara-web/dist/","buildServerDir":"file:///Users/andrejs/mara-web/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.JL0Opz3G.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/andrejs/mara-web/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CVErxJGR.mjs","/Users/andrejs/mara-web/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_Cc2jag08.mjs","/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=0&lang.ts":"_astro/Home.astro_astro_type_script_index_0_lang.C5-Bjjd-.js","/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=1&lang.ts":"_astro/Home.astro_astro_type_script_index_1_lang.CRElyE5u.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=0&lang.ts","function E(e,n=300){e.style.opacity=0,e.style.display=\"flex\";let t=performance.now();function c(o){let l=(o-t)/n,a=Math.min(parseFloat(e.style.opacity)+l,1);e.style.opacity=a,t=o,a<1&&requestAnimationFrame(c)}requestAnimationFrame(c)}function y(e,n=300){let t=1,c=performance.now();function o(l){let a=(l-c)/n;t-=a,e.style.opacity=Math.max(t,0),c=l,t>0?requestAnimationFrame(o):e.style.display=\"none\"}requestAnimationFrame(o)}let d=[],i=0;document.querySelectorAll(\".post details\").forEach(e=>{e.addEventListener(\"toggle\",()=>{if(e.open){document.querySelectorAll(\".post details.open\").forEach(t=>{t!==e&&(t.classList.remove(\"open\"),t.open=!1)});const n=e.querySelectorAll(\"img\");d=Array.from(n).map(t=>({src:t.getAttribute(\"src\"),desc:t.getAttribute(\"alt\")||t.getAttribute(\"title\"),alt:t.getAttribute(\"alt\")||\"no-alt\"})),d.length<0?g():(i=0,b())}})});document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.createElement(\"button\");e.id=\"close\",e.textContent=\"(close)\",e.className=\"close-button\",e.onclick=g;const n=document.createElement(\"button\");n.className=\"nav-button prev\",n.innerHTML=\"&lt;\",n.onclick=()=>m(-1);const t=document.createElement(\"button\");t.className=\"nav-button next\",t.innerHTML=\"&gt;\",t.onclick=()=>m(1);const c=document.createElement(\"div\");c.className=\"btnWrap\",c.style.display=\"none\";const o=document.createElement(\"div\");o.className=\"filler\",o.style.width=\"100%\";const l=document.createElement(\"div\");l.className=\"img-container\",l.style.display=\"none\";const a=document.createElement(\"div\");a.className=\"display-img\";const r=document.createElement(\"img\");r.id=\"large-display-img\",r.style.maxWidth=\"100%\",r.src=\"\";const p=document.createElement(\"p\");p.className=\"img-description\",p.id=\"image-desc\";const s=document.createElement(\"canvas\");s.className=\"canvas\",s.style.zIndex=\"-1\",s.style.top=\"0px\",s.style.left=\"0px\",s.style.position=\"absolute\",s.style.width=\"100%\",s.style.height=\"100%\",s.style.backgroundColor=\"white\",l.appendChild(s),a.appendChild(r),a.appendChild(p),l.appendChild(a),c.appendChild(n),c.appendChild(t),c.appendChild(o),c.appendChild(e),l.appendChild(c),document.body.appendChild(l)});function b(e){const n=document.querySelector(\".img-container\"),t=document.querySelector(\".btnWrap\");u(),f(),E(n),t.style.display=\"flex\";const c=document.querySelector(\".prev\"),o=document.querySelector(\".next\");d.length<=1?(c.style.display=\"none\",o.style.display=\"none\"):(c.style.display=\"block\",o.style.display=\"block\")}function f(){document.getElementById(\"large-display-img\").src=d[i].src,document.getElementById(\"image-desc\").textContent=d[i].desc}function m(e){i+=e,i<0?i=d.length-1:i>=d.length&&(i=0),f()}function u(){document.querySelectorAll(\".post details\").forEach(e=>{e.classList.remove(\"open\"),e.open=!1})}function g(){const e=document.querySelector(\".img-container\");y(e),document.querySelector(\".btnWrap\").style.display=\"none\",u()}function q(){const e=document.querySelector(\".img-container\");y(e),document.querySelector(\".btnWrap\").style.display=\"none\",u()}document.addEventListener(\"DOMContentLoaded\",function(){document.querySelectorAll(\".canvas\").forEach(e=>{e.addEventListener(\"click\",q)}),u()});let h=0,v=0;function C(){const e=v-h;Math.abs(e)>50&&(e<0?m(1):m(-1))}document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.querySelector(\".img-container\");e.addEventListener(\"touchstart\",n=>{h=n.changedTouches[0].screenX}),e.addEventListener(\"touchend\",n=>{v=n.changedTouches[0].screenX,C()})});"],["/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const c=document.querySelectorAll(\"details\"),i=document.getElementById(\"logo\"),d=document.getElementById(\"m\");c.forEach(e=>{const t=e.querySelector(\"summary\"),n=e.querySelectorAll(\"ul li\");t.addEventListener(\"click\",()=>{setTimeout(()=>{e.open?(t.classList.add(\"opened\"),e.classList.add(\"show-items\"),d.classList.add(\"opened\"),i.classList.add(\"opened\"),n.forEach(o=>o.classList.remove(\"visible\")),e.offsetWidth,n.forEach((o,s)=>{setTimeout(()=>{o.classList.add(\"visible\")},s*50)})):(t.classList.remove(\"opened\"),e.classList.remove(\"show-items\"),n.forEach(s=>s.classList.remove(\"visible\")),Array.from(c).some(s=>s.open)||(d.classList.remove(\"opened\"),i.classList.remove(\"opened\")))},50)})})});"]],"assets":["/_astro/logo.DSBRb4G0.svg","/_astro/Inter-VariableFont_opsz_wght.c8O0ljhh.ttf","/_astro/Inter-Italic-VariableFont_opsz_wght.B-9PvMw6.ttf","/_astro/index.JL0Opz3G.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"4QCISvMAjNAGH4nSQqrwKgEetUZZDh1Xc8qz8a778Yk=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_Cc2jag08.mjs');

export { manifest };
