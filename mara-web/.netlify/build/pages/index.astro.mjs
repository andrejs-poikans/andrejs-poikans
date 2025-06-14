import { c as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, i as renderComponent, m as maybeRenderHead, j as renderScript, k as renderHead, l as renderSlot } from '../chunks/astro/server_C1gO1D2m.mjs';
import 'kleur/colors';
import 'dotenv/config';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

async function wpquery({ query, variables = {} }) {
  const res = await fetch("https://maramckevitt.com/wp/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Basic YW5kcmVqc3BvaWthbnM6MjM4OSBYZGFYIGk5S0ogcEgySCBuSlZiIGdKam0='
      "Authorization": process.env.GRAPHQL_AUTH || ""
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  if (!res.ok) {
    console.error(res);
    return {};
  }
  const { data } = await res.json();
  return data;
}

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const Logo = createSvgComponent({"meta":{"src":"/_astro/logo.DSBRb4G0.svg","width":1045,"height":779,"format":"svg"},"attributes":{"id":"Layer_2","viewBox":"0 0 1044.85 778.9"},"children":"<g id=\"graphics\"><path d=\"M748.41,34.87c86.24,74.6,47.09,233.86,65.58,331.95,3.74,19.84,50.11,51.27,19.25,60.65-26.78,8.14-54.51-7.5-67.22-30.76-12.62,13.82-33.65,42.71-34.43,61.37-.38,9.22,16.4,58.25,20.89,70.24,30.91,82.67,116.36,222.49,218.26,213.9,17.26-1.46,35.51-8.04,38.37-27.48-18.27,9.93-35.83,12.34-54.73,2.17-5-18.1-8.35-51.33,9.51-63.33,5.29-3.56,43.14-11.84,47.18-10.82,4.95,1.25,7.15,10.63,12.14,14.78,5.04,4.19,14.1,1.97,17.07,10.17,12.49,34.6-1.14,75.24-34.51,91.36-59.94,28.97-119.58-2.69-166.9-39.93-33.5-26.36-57.05-67.02-76.78-105-20.94-40.32-38.8-82.77-50.6-126.68-29.49,76.16-81.31,172.76-29.41,249.85l9.32-2.74c8.03-16.7,16.66-29.96,37.38-28.18,72.94,69.59-47.94,92.31-83.32,33.49-51.31-85.31,20.18-197.49,45.82-277.12,15.07-46.79-2.18-52.29-8.89-91.56-8.53-49.94-11.26-101.66-18.65-151.81-7.11.69-6.86,6.95-8.74,11.67-20.31,50.82-30.72,100.43-56.15,152.9-10.32,21.29-50.42,81.07-52.99,96.98-13,80.58,25.5,195.8,36.36,277.14-5.02,44.58-20.27,4-39.26,2.35-19.5-1.7-24.7,5.46-40.58,13.48l-11.19-6.87c34.35-82.68,25.84-179.26,31.43-267.88-44.77-86.73-112.66-166.42-126.99-266.15-11.38-.76-7.79-1.06-8.96,6.88-4.81,32.62-5.48,65.91-10.53,98.61-5.55,35.96-21.58,67.4-15.74,104.77,3.29,21.04,17.49,36.85,23.07,54.16,18.56,57.6,34.87,171.75,9.89,226.39-18.71,40.94-68.17,75.47-109.1,40.96-50.48-42.57,37.22-112.7,43.24-18.2,6.27.82,11.4-.79,16.98-3.47,55.86-26.82,33.33-212.09-5.64-255.5-17.9,40.54-34.5,81.82-56.77,120.38-43.82,75.89-134.42,192.01-236.39,154.51-53.66-19.73-63.79-104.85-10.17-115.05,55.98-10.66,55.21,82.73-7.95,67.32,4.46,19.52,37.86,31.75,56.06,31.44,65.45-1.12,159.95-90.1,178.4-149.56,3.35-10.8-3.38-20.08,2.14-29.3,4.69-7.83,12.53-2.5,17.89-8.97,10.94-13.21,43.19-97.59,38.66-111.45-1.75-5.35-15.59-23.92-22.18-22.74-16.34,16.76-35.59,35.02-60.83,23.57-4.76-2.16-7.07.49-5.81-7.99,10.96-18,20.23-22.4,22.86-45.44,7.92-69.33-14.28-139.04-9.26-209.22,13.78-192.5,168.05-246.5,279.66-88.53,39.18-90.51,143.43-130.77,223.26-61.72ZM518.29,423.88c-4.74-94.05,10.27-222.43-29.56-308.96-25.85-56.15-75.52-104.41-141.72-78.23-77.12,30.49-78.77,155.53-62.95,223.82,5.46,23.58,34.25,96.28,47.06,116.54,2.53,3.99,4.26,10.09,9.93,10.48-4.94-20.13,5.21-36.49,8.01-53.39,12.3-74.24,20.59-148.85,21.47-223.93,24.61-36.41,33.7,80.76,35.44,87.47,5.64,21.83,23.72,67.3,32.91,89.79,19.68,48.17,45.43,96.73,79.41,136.41ZM722.8,396.62c33.94-89.28,82.93-230.83,26.58-319.66-29.35-46.27-109.89-70.68-151.68-30.45-83.01,79.91-51.85,227.32-51.7,329.67.02,16.13-7.17,31.33-4.89,47.68,6.77-2.47,12.53-16.13,15.93-22.64,49.3-94.56,89.41-193.15,102.21-300.03,37.79-5.4,20.85,38.28,22.74,65.87,5.09,74.39,18.3,149.46,31.93,222.64,1.37,7.38-3.1,7.91,8.88,6.91Z\" /></g>"});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const data = await wpquery({
    query: `query {
			posts {
				nodes {
					slug
					title
          content
				}
			}
		}
	`
  });
  return renderTemplate(_a || (_a = __template(["", " ", ' <!-- currently hanfdled by wordpress --><!-- <script src="../scripts/tags.js"><\/script> --><!-- <!DOCTYPE html><html lang="en">\n\n<head>\n  <meta charset="UTF-8" />\n  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">\n  <title>Mara McKevitt portfolio page</title>\n\n  <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/facicon_io/apple-touch-icon.png">\n  <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/facicon_io/favicon-32x32.png">\n  <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/facicon_io/favicon-16x16.png">\n  <link rel="icon" type="image/x-icon" href="../assets/images/facicon_io/images/favicon.ico">\n  <link rel="manifest" href="../assets/images/facicon_io/site.webmanifest">\n\n  <link rel="canonical" href="https://maramckevitt.com/index.html"/>\n  <meta name="description" content="Mara McKevitt portfolio page" />\n  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">\n</head> --><!-- <body> -->', '<div class="info"> <div class="name" id="mara"> <h3>Mara McKevitt</h3> </div> <div class="menu" id="menu"> ', ' <div class="logo" id="logo"> ', " </div> <!-- </body> --></div></div>"])), renderScript($$result, "/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "/Users/andrejs/mara-web/src/components/Home.astro?astro&type=script&index=1&lang.ts"), maybeRenderHead(), data.posts.nodes.map((post) => {
    return renderTemplate`<div> <details> <summary>${post.title}</summary> <div class="post">${unescapeHTML(post.content)}</div> </details> </div>`;
  }), renderComponent($$result, "Logo", Logo, { "id": "m" }));
}, "/Users/andrejs/mara-web/src/components/Home.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"><title>Mara McKevitt portfolio page</title><link rel="apple-touch-icon" sizes="180x180" href="../assets/images/facicon_io/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="../assets/images/facicon_io/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="../assets/images/facicon_io/favicon-16x16.png"><link rel="icon" type="image/x-icon" href="../assets/images/facicon_io/images/favicon.ico"><!-- <link rel="manifest" href="../assets/images/facicon_io/site.webmanifest"> --><link rel="canonical" href="https://maramckevitt.com/index.html"><meta name="description" content="Mara McKevitt portfolio page"><link rel="shortcut icon" type="image/x-icon" href="favicon.ico">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html><!-- <style>
	html,
	body {
		margin: 0;
		width: 100%;
		height: 100%;
	}
</style> -->`;
}, "/Users/andrejs/mara-web/src/layouts/Layout.astro", void 0);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Home", $$Home, {})} ` })}`;
}, "/Users/andrejs/mara-web/src/pages/index.astro", void 0);

const $$file = "/Users/andrejs/mara-web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
