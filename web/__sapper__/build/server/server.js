'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/routes/index.svelte generated by Svelte v3.20.1 */

const css = {
	code: "h1.svelte-vt2oe7{font-weight:bold;font-size:36pt;margin:0;margin-bottom:12pt}.container.svelte-vt2oe7{height:80vh;display:flex;align-items:center;box-sizing:border-box;padding:24pt;border-radius:8pt}.textHolder.svelte-vt2oe7{width:500pt}@media(max-width: 600pt){.textHolder.svelte-vt2oe7{width:100%}.container.svelte-vt2oe7{padding:8pt}}@media(max-height: 800px){.container.svelte-vt2oe7{align-items:center}}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\n\\tlet visible = false\\n\\timport { fade, fly } from 'svelte/transition';\\n\\n\\tconst toggleVisibility = () => {\\n\\t\\tvisible = visible ? false : true\\n\\t}\\n\\n</script>\\n\\n\\n<style>\\n\\n\\th1 {\\n\\t\\tfont-weight: bold;\\n\\t\\tfont-size:36pt;\\n\\t\\tmargin:0;\\n\\t\\tmargin-bottom:12pt;\\n\\t}\\n\\n\\t.container {\\n\\t\\theight:80vh;\\n\\t\\tdisplay:flex;\\n\\t\\talign-items:center;\\n\\t\\tbox-sizing:border-box;\\n\\t\\tpadding:24pt;\\n\\t\\tborder-radius:8pt;\\n\\t}\\n\\n\\t.textHolder {\\n\\t\\twidth:500pt;\\n\\t}\\n\\n\\t@media (max-width: 600pt) {\\n        .textHolder{\\n\\t\\t\\twidth:100%;\\n\\t\\t}\\n\\n\\t\\t.container {\\n\\t\\t\\tpadding:8pt;\\n\\t\\t}\\n\\n\\t}\\n\\t\\n\\t@media (max-height: 800px) {\\n        .container{\\n\\t\\t\\talign-items: center;\\n\\t\\t}\\n    }\\n\\n\\n</style>\\n\\n<svelte:head>\\n\\t<title> University Engineers' Club 👷‍♂️</title>\\n\\t<link href=\\\"https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap\\\" rel=\\\"stylesheet\\\">\\n\\t<link href=\\\"https://fonts.googleapis.com/icon?family=Material+Icons\\\" rel=\\\"stylesheet\\\">\\n</svelte:head>\\n\\n<div transition:fade=\\\"{{duration:120}}\\\" class='container'>\\n\\n\\t<div class='textHolder'>\\n\\t\\t<h1>\\n\\n\\t\\tThe <mark style='background:#27348b; color:white'>University of Western Australia</mark> <mark style='background:rgb(252,215,3)'>Engineers' Club</mark>\\n\\t\\t</h1>\\n\\n\\t\\t<p class='sub'>8th September 1921 - Present</p>\\n\\t\\t<p>The University of Western Australia Engineers Club is the <b>flagship faculty club</b> of UWA. Symbolic to the engineering mindset, our crest's moto \\\"<em>non loqui, sed facere</em>\\\" translates to <b>\\\"Not words, but actions\\\"</b>...</p>\\n\\t\\t\\n\\t\\t<a class='cta-button' style='margin-top:8pt;' href='about'>More about our History<span class=\\\"material-icons\\\">chevron_right</span></a>\\n\\t</div>\\n\\n</div>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,cAAC,CAAC,AACH,WAAW,CAAE,IAAI,CACjB,UAAU,IAAI,CACd,OAAO,CAAC,CACR,cAAc,IAAI,AACnB,CAAC,AAED,UAAU,cAAC,CAAC,AACX,OAAO,IAAI,CACX,QAAQ,IAAI,CACZ,YAAY,MAAM,CAClB,WAAW,UAAU,CACrB,QAAQ,IAAI,CACZ,cAAc,GAAG,AAClB,CAAC,AAED,WAAW,cAAC,CAAC,AACZ,MAAM,KAAK,AACZ,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpB,yBAAW,CAAC,AACjB,MAAM,IAAI,AACX,CAAC,AAED,UAAU,cAAC,CAAC,AACX,QAAQ,GAAG,AACZ,CAAC,AAEF,CAAC,AAED,MAAM,AAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AACrB,wBAAU,CAAC,AAChB,WAAW,CAAE,MAAM,AACpB,CAAC,AACC,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title> University Engineers&#39; Club 👷‍♂️</title>`, "")}<link href="${"https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap"}" rel="${"stylesheet"}"><link href="${"https://fonts.googleapis.com/icon?family=Material+Icons"}" rel="${"stylesheet"}">`, "")}

<div class="${"container svelte-vt2oe7"}"><div class="${"textHolder svelte-vt2oe7"}"><h1 class="${"svelte-vt2oe7"}">The <mark style="${"background:#27348b; color:white"}">University of Western Australia</mark> <mark style="${"background:rgb(252,215,3)"}">Engineers&#39; Club</mark></h1>

		<p class="${"sub"}">8th September 1921 - Present</p>
		<p>The University of Western Australia Engineers Club is the <b>flagship faculty club</b> of UWA. Symbolic to the engineering mindset, our crest&#39;s moto &quot;<em>non loqui, sed facere</em>&quot; translates to <b>&quot;Not words, but actions&quot;</b>...</p>
		
		<a class="${"cta-button"}" style="${"margin-top:8pt;"}" href="${"about"}">More about our History<span class="${"material-icons"}">chevron_right</span></a></div></div>`;
});

/* src/routes/sponsors.svelte generated by Svelte v3.20.1 */

const css$1 = {
	code: ".logo.svelte-39rpi0.svelte-39rpi0{height:32pt}.sponsors.svelte-39rpi0.svelte-39rpi0{display:grid;grid-template-columns:1fr 1fr 1fr;justify-items:center;width:100%;max-width:500pt;margin:0 auto;grid-row-gap:12pt}@media(max-width: 500pt){.sponsors.svelte-39rpi0.svelte-39rpi0{grid-template-columns:1fr 1fr}}.announcement.svelte-39rpi0.svelte-39rpi0{width:100%;max-width:500pt;margin:24pt auto}.announcement.svelte-39rpi0 .title.svelte-39rpi0{margin:0}.announcement.svelte-39rpi0 .title .party.svelte-39rpi0{text-transform:none;font-weight:bold;font-size:12pt;text-decoration:underline}",
	map: "{\"version\":3,\"file\":\"sponsors.svelte\",\"sources\":[\"sponsors.svelte\"],\"sourcesContent\":[\"<script>\\n\\n    import { fade, fly } from 'svelte/transition';\\n\\n    let sponsors = [\\n        {src:'austral.jpg',alt:'austral engineering'},\\n        {src:'ca.jpg',alt:'chartered accountants'},\\n        {src:'conoco.png',alt:'conocophillips'},\\n        {src:'gpa.jpg',alt:'gpa engineering'},\\n        {src:'wood&grieve.png',alt:'wood & grieve'},\\n        {src:'yara.png',alt:'yara'},\\n    ]\\n\\n    let announcements = [\\n        {id:'123a4', title:'2021 Graduate Recruitment Programme', date:'24th Febuary 2020', teaser:'This is some small teaser text. It\\\\'s interesting ot see this kind of description 😇', party:'Conoco Phillips'},\\n        {id:'123a4', title:'Vacation Workers 🎓', date:'12th Febuary 2020', teaser:'Rio is looking to recruit you! if you think you have what it takes apply at http://riotinto.org/recuitment/vacation', party:'Rio Tinto'},\\n        {id:'123a4', title:'A sample announcement', date:'24th Febuary 2020', teaser:'this is a small peice of text!', party:'Conoco Phillips'},\\n    ]\\n\\n</script>\\n\\n<style>\\n    .logo {\\n        height:32pt;\\n    }\\n    .sponsors {\\n        display: grid;\\n        grid-template-columns: 1fr 1fr 1fr;\\n        justify-items: center;\\n        width:100%;\\n        max-width:500pt;\\n        margin:0 auto;\\n        grid-row-gap: 12pt;\\n    }\\n\\n    @media (max-width: 500pt) {\\n        .sponsors {\\n            grid-template-columns: 1fr 1fr;\\n        }\\n    }\\n\\n    .announcement {\\n        width:100%;\\n        max-width:500pt;\\n        margin:24pt auto;\\n    }\\n\\n    .announcement .title {\\n        margin:0;\\n    }\\n\\n    .announcement .title .party {\\n        text-transform: none;\\n        font-weight:bold;\\n        font-size:12pt;\\n        text-decoration: underline;\\n    }\\n\\n</style>\\n\\n<svelte:head>\\n    <title>Sponsors 🙌</title>\\n</svelte:head>\\n\\n<div transition:fade=\\\"{{duration:120}}\\\">\\n    <h1 style=\\\"text-align:center; margin-bottom:24pt;\\\">Sponsors</h1>\\n\\n    <div class='sponsors'>\\n    {#each sponsors as sponsor}\\n        <img class='logo' src='logos/{sponsor.src}' alt={sponsor.alt}/>\\n    {/each}\\n    </div>\\n    <br>\\n    <h2 style='text-align:center; margin-top:24pt;'>Announcements</h2>\\n\\n    {#each announcements as announcement}\\n        <div class='announcement'>\\n        \\n            <p class='title'><span class='party'>{announcement.party}</span>: {announcement.title}</p>\\n            <p class='sub'>DATE: {announcement.date}</p>\\n            <p>{announcement.teaser}</p>\\n\\n            <a href='/'>Read More...</a>\\n\\n        </div>\\n    {/each}\\n\\n</div>\"],\"names\":[],\"mappings\":\"AAsBI,KAAK,4BAAC,CAAC,AACH,OAAO,IAAI,AACf,CAAC,AACD,SAAS,4BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,aAAa,CAAE,MAAM,CACrB,MAAM,IAAI,CACV,UAAU,KAAK,CACf,OAAO,CAAC,CAAC,IAAI,CACb,YAAY,CAAE,IAAI,AACtB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACvB,SAAS,4BAAC,CAAC,AACP,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAClC,CAAC,AACL,CAAC,AAED,aAAa,4BAAC,CAAC,AACX,MAAM,IAAI,CACV,UAAU,KAAK,CACf,OAAO,IAAI,CAAC,IAAI,AACpB,CAAC,AAED,2BAAa,CAAC,MAAM,cAAC,CAAC,AAClB,OAAO,CAAC,AACZ,CAAC,AAED,2BAAa,CAAC,MAAM,CAAC,MAAM,cAAC,CAAC,AACzB,cAAc,CAAE,IAAI,CACpB,YAAY,IAAI,CAChB,UAAU,IAAI,CACd,eAAe,CAAE,SAAS,AAC9B,CAAC\"}"
};

const Sponsors = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let sponsors = [
		{
			src: "austral.jpg",
			alt: "austral engineering"
		},
		{
			src: "ca.jpg",
			alt: "chartered accountants"
		},
		{ src: "conoco.png", alt: "conocophillips" },
		{ src: "gpa.jpg", alt: "gpa engineering" },
		{
			src: "wood&grieve.png",
			alt: "wood & grieve"
		},
		{ src: "yara.png", alt: "yara" }
	];

	let announcements = [
		{
			id: "123a4",
			title: "2021 Graduate Recruitment Programme",
			date: "24th Febuary 2020",
			teaser: "This is some small teaser text. It's interesting ot see this kind of description 😇",
			party: "Conoco Phillips"
		},
		{
			id: "123a4",
			title: "Vacation Workers 🎓",
			date: "12th Febuary 2020",
			teaser: "Rio is looking to recruit you! if you think you have what it takes apply at http://riotinto.org/recuitment/vacation",
			party: "Rio Tinto"
		},
		{
			id: "123a4",
			title: "A sample announcement",
			date: "24th Febuary 2020",
			teaser: "this is a small peice of text!",
			party: "Conoco Phillips"
		}
	];

	$$result.css.add(css$1);

	return `${($$result.head += `${($$result.title = `<title>Sponsors 🙌</title>`, "")}`, "")}

<div><h1 style="${"text-align:center; margin-bottom:24pt;"}">Sponsors</h1>

    <div class="${"sponsors svelte-39rpi0"}">${each(sponsors, sponsor => `<img class="${"logo svelte-39rpi0"}" src="${"logos/" + escape(sponsor.src)}"${add_attribute("alt", sponsor.alt, 0)}>`)}</div>
    <br>
    <h2 style="${"text-align:center; margin-top:24pt;"}">Announcements</h2>

    ${each(announcements, announcement => `<div class="${"announcement svelte-39rpi0"}"><p class="${"title svelte-39rpi0"}"><span class="${"party svelte-39rpi0"}">${escape(announcement.party)}</span>: ${escape(announcement.title)}</p>
            <p class="${"sub"}">DATE: ${escape(announcement.date)}</p>
            <p>${escape(announcement.teaser)}</p>

            <a href="${"/"}">Read More...</a>

        </div>`)}</div>`;
});

/* src/routes/contact.svelte generated by Svelte v3.20.1 */

const css$2 = {
	code: ".message.svelte-1e75fxd.svelte-1e75fxd{max-width:500pt;width:100%;margin:0 auto}.table.svelte-1e75fxd.svelte-1e75fxd{max-width:500pt;box-sizing:border-box;margin:0 auto}.table.svelte-1e75fxd .table-row.svelte-1e75fxd{display:grid;grid-template-columns:1fr 1fr 1fr;font-size:10pt;width:100%;box-sizing:border-box;row-gap:4pt;border-bottom:1px solid rgba(0,0,0,.12);padding:4pt 8pt;border-radius:8pt 8pt 0 0}.table-row.svelte-1e75fxd.svelte-1e75fxd:first-child{background:#FCD703}.table.svelte-1e75fxd .table-heading.svelte-1e75fxd{font-weight:600;box-sizing:border-box;margin:0;width:100%}.table.svelte-1e75fxd .table-element.svelte-1e75fxd{font-weight:400;text-transform:capitalize;box-sizing:border-box;margin:0;width:100%}.role.svelte-1e75fxd.svelte-1e75fxd,.name.svelte-1e75fxd.svelte-1e75fxd{text-align:left}.email.svelte-1e75fxd.svelte-1e75fxd{text-align:right}@media(max-width: 500pt){.role.svelte-1e75fxd.svelte-1e75fxd{display:none !important}.table.svelte-1e75fxd .table-row.svelte-1e75fxd{grid-template-columns:1fr 1fr !important}}",
	map: "{\"version\":3,\"file\":\"contact.svelte\",\"sources\":[\"contact.svelte\"],\"sourcesContent\":[\"<script>\\n    import { fade, fly } from 'svelte/transition';\\n  let positions = [\\n    {\\n      title: \\\"president\\\",\\n      role: \\\"president\\\",\\n      name: \\\"alex shearer\\\",\\n      email: \\\"president@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"treasurer\\\",\\n      role: \\\"treasurer\\\",\\n      name: \\\"alexandra crier\\\",\\n      email: \\\"treasurer@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"secretary\\\",\\n      role: \\\"secretary\\\",\\n      name: \\\"emma lathbury\\\",\\n      email: \\\"president@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Education Vice President\\\",\\n      role: \\\"edvp\\\",\\n      name: \\\"emma zandi\\\",\\n      email: \\\"education@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Social Vice President\\\",\\n      role: \\\"socialvp\\\",\\n      name: \\\"liv kerr\\\",\\n      email: \\\"social@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Careers Vice President\\\",\\n      role: \\\"careersvp\\\",\\n      name: \\\"matthew jongenelis\\\",\\n      email: \\\"careers@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Welfare Vice President\\\",\\n      role: \\\"welfarevp\\\",\\n      name: \\\"Nikki Olver\\\",\\n      email: \\\"welfare@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Postgraduage Education\\\",\\n      role: \\\"postgradrep\\\",\\n      name: \\\"Steffen Remvik\\\",\\n      email: \\\"postgradeducation@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Undergraduate Education\\\",\\n      role: \\\"undergradrep\\\",\\n      name: \\\"Sachio Ingrilli\\\",\\n      email: \\\"undergradeducation@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Comp-Sci Representative\\\",\\n      role: \\\"computersciencerep\\\",\\n      name: \\\"James Oakey\\\",\\n      email: \\\"computersciencerep@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Physics Representative\\\",\\n      role: \\\"physicsrep\\\",\\n      name: \\\"Connor Winter\\\",\\n      email: \\\"physics@uec.org.au\\\"\\n    },\\n    {\\n      title: \\\"Math Representative\\\",\\n      role: \\\"mathrep\\\",\\n      name: \\\"James Oakey\\\",\\n      email: \\\"mathsrep@uec.org.au\\\"\\n    }\\n  ];\\n</script>\\n\\n<style>\\n\\n    .message {\\n        max-width:500pt;\\n        width:100%;\\n        margin:0 auto;\\n    }\\n    .table {\\n        max-width:500pt;\\n        box-sizing: border-box;\\n        margin:0 auto;\\n    }\\n    .table .table-row{\\n        display:grid;\\n        grid-template-columns: 1fr 1fr 1fr;\\n        font-size:10pt;\\n        width:100%;\\n        box-sizing: border-box;\\n        row-gap: 4pt;\\n        border-bottom: 1px solid rgba(0,0,0,.12);\\n        padding:4pt 8pt;\\n        border-radius:8pt 8pt 0 0;\\n    }\\n\\n    .table-row:first-child {\\n        background:#FCD703;\\n    }\\n\\n    .table .table-heading {\\n        font-weight:600;\\n        box-sizing: border-box;\\n        margin:0;\\n        width:100%;\\n    }\\n\\n    .table .table-element{\\n        font-weight:400;\\n        text-transform: capitalize;\\n        box-sizing: border-box;\\n        margin:0;\\n        width:100%;\\n    }\\n\\n    .role, .name {\\n        text-align:left;\\n    }\\n\\n    .email {\\n        text-align:right;\\n    }\\n\\n    @media (max-width: 500pt){\\n\\t\\t .role {\\n             display:none !important;\\n         }\\n         .table .table-row {\\n             grid-template-columns: 1fr 1fr !important;\\n         }\\n\\t }\\n\\n</style>\\n\\n<svelte:head>\\n  <title>Contact Us 👋</title>\\n</svelte:head>\\n\\n<h1 style='text-align:center;'>👋 to the Commitee</h1>\\n\\n<p style='margin-bottom:24pt;' class='message'>Feel free to say hi to us! We'd love to hear from you - any questions, complaints or even stories! As we're in direct contact with the faculty office, we speak on behalf of the student body. If there are any pressing concerns that you want sorted out, do let us know!</p>\\n\\n<div class='table' transition:fade=\\\"{{duration:120}}\\\">\\n\\n    <div class='table-row'>\\n        <p class=\\\"table-heading role\\\">Role</p>\\n        <p class=\\\"table-heading name\\\">Name</p>\\n        <p class=\\\"table-heading email\\\">Email</p>\\n    </div>\\n\\n    {#each positions as position}\\n    <div class='table-row'>\\n        <p class=\\\"table-element role\\\">\\n            <span>{position.title}</span>\\n        </p>\\n\\n        <p class=\\\"table-element name\\\"><span>{position.name}</span></p>\\n\\n        <p class=\\\"table-element email\\\" style=\\\"text-transform:lowercase\\\">\\n            <a href=\\\"mailto:{position.email}\\\">\\n            <code>{position.email}</code>\\n            </a>\\n        </p>\\n    </div>\\n    {/each}\\n\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAgFI,QAAQ,8BAAC,CAAC,AACN,UAAU,KAAK,CACf,MAAM,IAAI,CACV,OAAO,CAAC,CAAC,IAAI,AACjB,CAAC,AACD,MAAM,8BAAC,CAAC,AACJ,UAAU,KAAK,CACf,UAAU,CAAE,UAAU,CACtB,OAAO,CAAC,CAAC,IAAI,AACjB,CAAC,AACD,qBAAM,CAAC,yBAAU,CAAC,AACd,QAAQ,IAAI,CACZ,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,UAAU,IAAI,CACd,MAAM,IAAI,CACV,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,QAAQ,GAAG,CAAC,GAAG,CACf,cAAc,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAC7B,CAAC,AAED,wCAAU,YAAY,AAAC,CAAC,AACpB,WAAW,OAAO,AACtB,CAAC,AAED,qBAAM,CAAC,cAAc,eAAC,CAAC,AACnB,YAAY,GAAG,CACf,UAAU,CAAE,UAAU,CACtB,OAAO,CAAC,CACR,MAAM,IAAI,AACd,CAAC,AAED,qBAAM,CAAC,6BAAc,CAAC,AAClB,YAAY,GAAG,CACf,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,UAAU,CACtB,OAAO,CAAC,CACR,MAAM,IAAI,AACd,CAAC,AAED,mCAAK,CAAE,KAAK,8BAAC,CAAC,AACV,WAAW,IAAI,AACnB,CAAC,AAED,MAAM,8BAAC,CAAC,AACJ,WAAW,KAAK,AACpB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,CAAC,AAC3B,KAAK,8BAAC,CAAC,AACG,QAAQ,IAAI,CAAC,UAAU,AAC3B,CAAC,AACD,qBAAM,CAAC,UAAU,eAAC,CAAC,AACf,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,UAAU,AAC7C,CAAC,AACR,CAAC\"}"
};

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let positions = [
		{
			title: "president",
			role: "president",
			name: "alex shearer",
			email: "president@uec.org.au"
		},
		{
			title: "treasurer",
			role: "treasurer",
			name: "alexandra crier",
			email: "treasurer@uec.org.au"
		},
		{
			title: "secretary",
			role: "secretary",
			name: "emma lathbury",
			email: "president@uec.org.au"
		},
		{
			title: "Education Vice President",
			role: "edvp",
			name: "emma zandi",
			email: "education@uec.org.au"
		},
		{
			title: "Social Vice President",
			role: "socialvp",
			name: "liv kerr",
			email: "social@uec.org.au"
		},
		{
			title: "Careers Vice President",
			role: "careersvp",
			name: "matthew jongenelis",
			email: "careers@uec.org.au"
		},
		{
			title: "Welfare Vice President",
			role: "welfarevp",
			name: "Nikki Olver",
			email: "welfare@uec.org.au"
		},
		{
			title: "Postgraduage Education",
			role: "postgradrep",
			name: "Steffen Remvik",
			email: "postgradeducation@uec.org.au"
		},
		{
			title: "Undergraduate Education",
			role: "undergradrep",
			name: "Sachio Ingrilli",
			email: "undergradeducation@uec.org.au"
		},
		{
			title: "Comp-Sci Representative",
			role: "computersciencerep",
			name: "James Oakey",
			email: "computersciencerep@uec.org.au"
		},
		{
			title: "Physics Representative",
			role: "physicsrep",
			name: "Connor Winter",
			email: "physics@uec.org.au"
		},
		{
			title: "Math Representative",
			role: "mathrep",
			name: "James Oakey",
			email: "mathsrep@uec.org.au"
		}
	];

	$$result.css.add(css$2);

	return `${($$result.head += `${($$result.title = `<title>Contact Us 👋</title>`, "")}`, "")}

<h1 style="${"text-align:center;"}">👋 to the Commitee</h1>

<p style="${"margin-bottom:24pt;"}" class="${"message svelte-1e75fxd"}">Feel free to say hi to us! We&#39;d love to hear from you - any questions, complaints or even stories! As we&#39;re in direct contact with the faculty office, we speak on behalf of the student body. If there are any pressing concerns that you want sorted out, do let us know!</p>

<div class="${"table svelte-1e75fxd"}"><div class="${"table-row svelte-1e75fxd"}"><p class="${"table-heading role svelte-1e75fxd"}">Role</p>
        <p class="${"table-heading name svelte-1e75fxd"}">Name</p>
        <p class="${"table-heading email svelte-1e75fxd"}">Email</p></div>

    ${each(positions, position => `<div class="${"table-row svelte-1e75fxd"}"><p class="${"table-element role svelte-1e75fxd"}"><span>${escape(position.title)}</span></p>

        <p class="${"table-element name svelte-1e75fxd"}"><span>${escape(position.name)}</span></p>

        <p class="${"table-element email svelte-1e75fxd"}" style="${"text-transform:lowercase"}"><a href="${"mailto:" + escape(position.email)}"><code>${escape(position.email)}</code>
            </a></p>
    </div>`)}</div>`;
});

/* src/routes/about.svelte generated by Svelte v3.20.1 */

const css$3 = {
	code: "div.svelte-1yndsin{max-width:500pt;margin:0 auto;box-sizing:border-box}@media(max-width: 700pt){div.svelte-1yndsin{padding:10pt}.sub.svelte-1yndsin{margin-bottom:12pt !important}}",
	map: "{\"version\":3,\"file\":\"about.svelte\",\"sources\":[\"about.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { fade, fly } from 'svelte/transition';\\n</script>\\n\\n<style>\\n\\tdiv{\\n\\t\\tmax-width:500pt;\\n\\t\\tmargin:0 auto;\\n\\t\\tbox-sizing:border-box;\\n\\t}\\n\\n\\t@media (max-width: 700pt) {\\n        div {\\n\\t\\t\\tpadding:10pt;\\n\\t\\t}\\n\\n\\t\\t.sub {\\n\\t\\t\\tmargin-bottom:12pt !important;\\n\\t\\t}\\n\\n    }\\n\\n</style>\\n\\n<svelte:head>\\n\\t<title>About 📖</title>\\n</svelte:head>\\n\\n<div transition:fade=\\\"{{duration:120}}\\\">\\n\\t<h1 style='text-align:center'>Our History</h1>\\n\\n\\t<p class='sub' style='text-align:center; margin-bottom:56pt'>Fond Memories from John Brearley</p>\\n\\n\\t<p>Engineering was one of three initial Faculties in the University of Western Australia. In 1913 the Engineering School was established miles from anywhere in the bushlands of Crawley Bay in the old homestead of Sir George Shenton. The School buildings at the time consisted of the old homestead, a large stable, some low lean-to sheds and three milking sheds.</p>\\n\\n\\t<p>In 1919 the ranks of the School were swelled by the return of ex-Serviceman and the current dance craze led to the holding of the first Engineering ball that year. No records of this remain until 1921 when a general meeting was held on June 20 to elect a Ball Committee. The success of these early balls resulted in the formation of the Club.</p>\\n\\n\\t<p>The University of Western Australia Engineers Club (UEC, for short) was formed on September 8 1921. A Mr. Morrison moved that an organization to be known as D.B.A. (Dirty Bastards Association) be set up. This was amended to D.B.A. Club and was launched onto the university. Some dissatisfaction may have remained in the minds of the committee as to the interpretation given to the name, as on May 26 1922 a Mr. Lemon obtained a change of name to University Engineers Club.</p>\\n\\n\\t<p>The UEC crest was designed by Eric Montifiore and drawn by Don Munro and George Manners for the 1929 Ball. It was decided to have the design contain the necessities of Engineering Life. The original design had 3 counters or pennies however this has been changed to 3 dice. The assistance of Associate Professor Wood of the Classics Department was sought in arriving at “non loqui, sed facere”; the Latin version of “not to talk, but do things”.</p>\\n\\n\\t<p>Profits from these UEC social activities were used to fund actions of particular significance to the students. One of the first items paid for was the Hancock memorial window in Winthrop Hall and the Engineering library was also established with money provided by the UEC.</p>\\n\\n\\t<p>In the 1920’s the Engineering students also came into contact with other students at the University of Western Australia on a more regular basis. The Senate had spent a great deal of energy arguing about the most suitable permanent site for the University – they were torn between King’s Park, Government House and the Crawley campus – but between 1927 and 1932 the entire University moved to Crawley to join the Engineers. As part of this process, the Engineering Faculty also gained a new building, constructed in 1927 by the Public Works Department of the State government. The building, which cost £8825 at the time, still stands at the University, now acting as the Tavern.</p>\\n\\n\\t<p>R.J. Fitch recalls that:</p>\\n\\n\\t<p>\\\"The facilities were less than primitive. Shenton House, with its accompanying galvanised iron sheds standing knee deep in wild oats-the latter posturing as laboratories-constituted the School’s entire establishment until mid 1927, when the two story brick building alongside Shenton House was opened…. To all intents and purposes laboratories did not exist. There were a couple of boilers from the former Subiaco power stations, and an assortment of derelict items of machinery which we students tried to assemble and mount on concrete foundations which we had constructed previously by hand.\\\"</p>\\n\\n\\t<p>This building was partially constructed by the Engineering students and Fitch recalls that in 1930,</p>\\n\\n\\t<p>\\\"we spent one afternoon a week mixing concrete and laying down floors in the laboratories.\\\"</p>\\n\\n\\t<p>Indeed, even a graduate from the 1940s, F.J. Buchanan, remembered that</p>\\n\\n\\t<p>“The various Departments were located in pretty crude out buildings much in the manner of an old fashioned farm, and one often thought the term laboratory was a gilding of the lily.”</p>\\n\\n\\t<p>The Engineering Faculty also began to enrol women in the late 1960s. The first female graduate was Miss R.K. Clarke, a Civil student, who completed her degree in 1970.</p>\\n\\n\\t<p>“In the old days the U.E.C. emblem was entrusted to the safe keeping of one of the students, who kept it at his lodgings. One day, during his absence, two of the Science Union’s more experienced cracksmen were detailed to blind the landlady with science and filch the banner. Claiming to be Engineers, these low types approached the unsuspecting landlady, and asked for the banner, quite truthfully explaining that it was “wanted for a Uni. ceremony.” The landlady (God forgive her, for she knew not what she was doing) handed it over…..</p>\\n\\n\\t<p>It was not until the night of Graduation Ceremony 1942 (sic) that the Engineers found and opportunity to get revenge on the Scientists. Surrounded by an overstrength bodyguard the Scientists’ banner moved into Winthrop Hall. Although they kept close to the wall and provided almost impenetrable protection on three sides, the stinkers forgot to provide an “umbrella.” An enterprising Engineer on the balcony above hooked it up with a fishing line and shot downstairs with it before the stunned scientists awoke to what had happened.”</p>\\n\\n\\t<p>“It was the habit of most students, during classes, to smoke profusely…. particularly [at] structural engineering lectures given by Professor Blakey, who also lit up several cigarettes. Lighting a cigarette for Prof. Blakey was a solemn ritual. He would take a fag from the packet and always put the cigarette in his mouth with the cork tip end outermost. Once striking the match to light it, would then reverse the cigarette and put the cork tip between his lips and apply the lighted match to the outer end. This ceremony was repeated on every occasion he smoked a cigarette. Towards the middle of the lecture, after about one hour, the air in the room… was just a blue haze, the smoke was so thick it was difficult to see what was written on the blackboard and I, personally, felt very drowsy and wanted to have a snooze.”</p>\\n\\n\\t<p>– Gorden E. Randell, Bachelor of Engineering 1947.</p>\\n\\n\\t<p>Engineering students built the pond outside Winthrop Hall before its official opening. They thus had a certain proprietary feeling about this pond and their right to throw others into it.</p>\\n\\n\\t<p>The Mech lab was the venue for the welding lesson given to one George Grljusich. George was abducted by the Riot Squad as a payback for when the Lawyers sentenced me to be pelted with tomatoes in the stocks on Whitfeld Court. It was the only time such punitive action took place at the Engineering School, and this was probably a bad decision, as I seem to recall the process of welding George by chain to a length of 8″x4″ RSJ was discouraged by a staff member, rather than by legal argument. As usual the Lawyers distorted things, with Chief Justice Porky Malcolm claiming in the “West – Inside Cover”, Sept 22 1998, that George had actually been rescued by retired Supreme Court Justice Terry Walsh.</p>\\n\\n\\t<p>What led up to all this? For some reason the Lawyers rose above their station and felt that they should be taken seriously. Such delusions could not be left unanswered. The UEC leaders of the day decided to form the “Committee for the Upholding of the High Prestige of the UEC” – otherwise known as the Riot Squad.</p>\\n\\n\\t<p>This made only a few formal incursions. The first was when it marched behind the Banner to extract Blackstone Society President Bob Nicholson and other Lawyers from a Guild Council Meeting, and ponded them.</p>\\n\\n\\t<p>The Lawyers decided to apply legal proceedings, and punishment in the form of a set of Stocks that were set up on Whitfeld Court. Unfortunately on the day concerned I happened to be seen in Broadway buying a paper and I found myself kidnapped and carted to the Law School off Fairway. I was stripped to underpants and hauled off to Whitfeld court and locked in the stocks. There was a good crowd on the lawn and great amusement as I was ceremoniously tried for being an Engineer and convicted to pelting with tomatoes.</p>\\n\\n\\t<p>This was of course quite humiliating and the mood changed when a group of former St Hilda’s girls were angered and started throwing tomatoes back at the lawyers. However serious help was to come from another quarter. A UEC lunch time meeting was in progress when one of the Tommy More College Engineers returning from lunch burst in shouting “they’ve got Wittenoom in stocks on Whitfeld Court.” The result was quite amazing – Engineers came from everywhere, through the arch (on foot) and around the Ref (by car). The stocks were literally torn apart to release me and Lawyers were unceremoniously ponded.</p>\\n\\n\\t<p style='text-align:center'>. . .</p>\\n\\n</div>\"],\"names\":[],\"mappings\":\"AAKC,kBAAG,CAAC,AACH,UAAU,KAAK,CACf,OAAO,CAAC,CAAC,IAAI,CACb,WAAW,UAAU,AACtB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpB,GAAG,eAAC,CAAC,AACV,QAAQ,IAAI,AACb,CAAC,AAED,IAAI,eAAC,CAAC,AACL,cAAc,IAAI,CAAC,UAAU,AAC9B,CAAC,AAEC,CAAC\"}"
};

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>About 📖</title>`, "")}`, "")}

<div class="${"svelte-1yndsin"}"><h1 style="${"text-align:center"}">Our History</h1>

	<p class="${"sub svelte-1yndsin"}" style="${"text-align:center; margin-bottom:56pt"}">Fond Memories from John Brearley</p>

	<p>Engineering was one of three initial Faculties in the University of Western Australia. In 1913 the Engineering School was established miles from anywhere in the bushlands of Crawley Bay in the old homestead of Sir George Shenton. The School buildings at the time consisted of the old homestead, a large stable, some low lean-to sheds and three milking sheds.</p>

	<p>In 1919 the ranks of the School were swelled by the return of ex-Serviceman and the current dance craze led to the holding of the first Engineering ball that year. No records of this remain until 1921 when a general meeting was held on June 20 to elect a Ball Committee. The success of these early balls resulted in the formation of the Club.</p>

	<p>The University of Western Australia Engineers Club (UEC, for short) was formed on September 8 1921. A Mr. Morrison moved that an organization to be known as D.B.A. (Dirty Bastards Association) be set up. This was amended to D.B.A. Club and was launched onto the university. Some dissatisfaction may have remained in the minds of the committee as to the interpretation given to the name, as on May 26 1922 a Mr. Lemon obtained a change of name to University Engineers Club.</p>

	<p>The UEC crest was designed by Eric Montifiore and drawn by Don Munro and George Manners for the 1929 Ball. It was decided to have the design contain the necessities of Engineering Life. The original design had 3 counters or pennies however this has been changed to 3 dice. The assistance of Associate Professor Wood of the Classics Department was sought in arriving at “non loqui, sed facere”; the Latin version of “not to talk, but do things”.</p>

	<p>Profits from these UEC social activities were used to fund actions of particular significance to the students. One of the first items paid for was the Hancock memorial window in Winthrop Hall and the Engineering library was also established with money provided by the UEC.</p>

	<p>In the 1920’s the Engineering students also came into contact with other students at the University of Western Australia on a more regular basis. The Senate had spent a great deal of energy arguing about the most suitable permanent site for the University – they were torn between King’s Park, Government House and the Crawley campus – but between 1927 and 1932 the entire University moved to Crawley to join the Engineers. As part of this process, the Engineering Faculty also gained a new building, constructed in 1927 by the Public Works Department of the State government. The building, which cost £8825 at the time, still stands at the University, now acting as the Tavern.</p>

	<p>R.J. Fitch recalls that:</p>

	<p>&quot;The facilities were less than primitive. Shenton House, with its accompanying galvanised iron sheds standing knee deep in wild oats-the latter posturing as laboratories-constituted the School’s entire establishment until mid 1927, when the two story brick building alongside Shenton House was opened…. To all intents and purposes laboratories did not exist. There were a couple of boilers from the former Subiaco power stations, and an assortment of derelict items of machinery which we students tried to assemble and mount on concrete foundations which we had constructed previously by hand.&quot;</p>

	<p>This building was partially constructed by the Engineering students and Fitch recalls that in 1930,</p>

	<p>&quot;we spent one afternoon a week mixing concrete and laying down floors in the laboratories.&quot;</p>

	<p>Indeed, even a graduate from the 1940s, F.J. Buchanan, remembered that</p>

	<p>“The various Departments were located in pretty crude out buildings much in the manner of an old fashioned farm, and one often thought the term laboratory was a gilding of the lily.”</p>

	<p>The Engineering Faculty also began to enrol women in the late 1960s. The first female graduate was Miss R.K. Clarke, a Civil student, who completed her degree in 1970.</p>

	<p>“In the old days the U.E.C. emblem was entrusted to the safe keeping of one of the students, who kept it at his lodgings. One day, during his absence, two of the Science Union’s more experienced cracksmen were detailed to blind the landlady with science and filch the banner. Claiming to be Engineers, these low types approached the unsuspecting landlady, and asked for the banner, quite truthfully explaining that it was “wanted for a Uni. ceremony.” The landlady (God forgive her, for she knew not what she was doing) handed it over…..</p>

	<p>It was not until the night of Graduation Ceremony 1942 (sic) that the Engineers found and opportunity to get revenge on the Scientists. Surrounded by an overstrength bodyguard the Scientists’ banner moved into Winthrop Hall. Although they kept close to the wall and provided almost impenetrable protection on three sides, the stinkers forgot to provide an “umbrella.” An enterprising Engineer on the balcony above hooked it up with a fishing line and shot downstairs with it before the stunned scientists awoke to what had happened.”</p>

	<p>“It was the habit of most students, during classes, to smoke profusely…. particularly [at] structural engineering lectures given by Professor Blakey, who also lit up several cigarettes. Lighting a cigarette for Prof. Blakey was a solemn ritual. He would take a fag from the packet and always put the cigarette in his mouth with the cork tip end outermost. Once striking the match to light it, would then reverse the cigarette and put the cork tip between his lips and apply the lighted match to the outer end. This ceremony was repeated on every occasion he smoked a cigarette. Towards the middle of the lecture, after about one hour, the air in the room… was just a blue haze, the smoke was so thick it was difficult to see what was written on the blackboard and I, personally, felt very drowsy and wanted to have a snooze.”</p>

	<p>– Gorden E. Randell, Bachelor of Engineering 1947.</p>

	<p>Engineering students built the pond outside Winthrop Hall before its official opening. They thus had a certain proprietary feeling about this pond and their right to throw others into it.</p>

	<p>The Mech lab was the venue for the welding lesson given to one George Grljusich. George was abducted by the Riot Squad as a payback for when the Lawyers sentenced me to be pelted with tomatoes in the stocks on Whitfeld Court. It was the only time such punitive action took place at the Engineering School, and this was probably a bad decision, as I seem to recall the process of welding George by chain to a length of 8″x4″ RSJ was discouraged by a staff member, rather than by legal argument. As usual the Lawyers distorted things, with Chief Justice Porky Malcolm claiming in the “West – Inside Cover”, Sept 22 1998, that George had actually been rescued by retired Supreme Court Justice Terry Walsh.</p>

	<p>What led up to all this? For some reason the Lawyers rose above their station and felt that they should be taken seriously. Such delusions could not be left unanswered. The UEC leaders of the day decided to form the “Committee for the Upholding of the High Prestige of the UEC” – otherwise known as the Riot Squad.</p>

	<p>This made only a few formal incursions. The first was when it marched behind the Banner to extract Blackstone Society President Bob Nicholson and other Lawyers from a Guild Council Meeting, and ponded them.</p>

	<p>The Lawyers decided to apply legal proceedings, and punishment in the form of a set of Stocks that were set up on Whitfeld Court. Unfortunately on the day concerned I happened to be seen in Broadway buying a paper and I found myself kidnapped and carted to the Law School off Fairway. I was stripped to underpants and hauled off to Whitfeld court and locked in the stocks. There was a good crowd on the lawn and great amusement as I was ceremoniously tried for being an Engineer and convicted to pelting with tomatoes.</p>

	<p>This was of course quite humiliating and the mood changed when a group of former St Hilda’s girls were angered and started throwing tomatoes back at the lawyers. However serious help was to come from another quarter. A UEC lunch time meeting was in progress when one of the Tommy More College Engineers returning from lunch burst in shouting “they’ve got Wittenoom in stocks on Whitfeld Court.” The result was quite amazing – Engineers came from everywhere, through the arch (on foot) and around the Ref (by car). The stocks were literally torn apart to release me and Lawyers were unceremoniously ponded.</p>

	<p style="${"text-align:center"}">. . .</p></div>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.20.1 */

const css$4 = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$4);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-1frg2tf"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.20.1 */

const css$5 = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$5);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-gnxal1"}">${post.html}</div>`;
});

/* src/components/Nav.svelte generated by Svelte v3.20.1 */

const css$6 = {
	code: "nav.svelte-urh0tn.svelte-urh0tn{height:36pt;display:flex;align-items:center;justify-content:space-between;padding:0 32pt;padding-top:12pt;margin-bottom:12pt}nav.svelte-urh0tn .logo.svelte-urh0tn{height:30pt}nav.svelte-urh0tn .link-holder.svelte-urh0tn{margin:0}nav.svelte-urh0tn .link.svelte-urh0tn{color:rgb(0,100,200);text-decoration:none;padding:0 6pt;text-transform:capitalize\n\t}nav.svelte-urh0tn .link.svelte-urh0tn:hover{text-decoration:underline}nav.svelte-urh0tn .link.svelte-urh0tn:visited{color:rgb(0,100,150)}.banner.svelte-urh0tn.svelte-urh0tn{background:#2ed573;width:100vw;text-align:center;font-weight:600;font-size:8pt;padding:0 16pt;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box}.banner-close.svelte-urh0tn.svelte-urh0tn{border-radius:32pt;font-size:10pt;display:flex;align-items:center;justify-content:center;color:white;cursor:pointer}@media(max-width: 500pt){nav.svelte-urh0tn.svelte-urh0tn{display:flex;flex-direction:column;align-items:center;height:auto}nav.svelte-urh0tn .link-holder.svelte-urh0tn{margin-top:8pt;display:grid;grid-template-columns:1fr 1fr 1fr 1fr}}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let segment;\\n\\timport { fade, fly } from 'svelte/transition';\\n\\tlet banner = {}\\n\\tlet closed = false;\\n</script>\\n\\n<svelte:head>\\n\\t<link href=\\\"https://fonts.googleapis.com/icon?family=Material+Icons\\\" rel=\\\"stylesheet\\\">\\n</svelte:head>\\n\\n<style>\\n\\n\\tnav {\\n\\t\\theight: 36pt;\\n\\t\\tdisplay:flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\tpadding: 0 32pt;\\n\\t\\tpadding-top:12pt;\\n\\t\\tmargin-bottom: 12pt;\\n\\t}\\n\\n\\tnav .logo {\\n\\t\\theight:30pt;\\n\\t}\\n\\n\\tnav .link-holder {\\n\\t\\tmargin:0;\\n\\t}\\n\\n\\tnav .link {\\n\\t\\tcolor: rgb(0,100,200);\\n\\t\\ttext-decoration: none;\\n\\t\\tpadding: 0 6pt;\\n\\t\\ttext-transform: capitalize\\n\\t}\\n\\n\\tnav .link:hover {\\n\\t\\ttext-decoration: underline;\\n\\t}\\n\\n\\tnav .link:visited {\\n\\t\\tcolor: rgb(0,100,150);\\n\\t}\\n\\n\\t.banner {\\n\\t\\tbackground:#2ed573;\\n\\t\\twidth:100vw;\\n\\t\\ttext-align:center;\\n\\t\\tfont-weight: 600;\\n\\t\\tfont-size:8pt;\\n\\t\\tpadding:0 16pt;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\t.banner-close{\\n\\t\\tborder-radius:32pt;\\n\\t\\tfont-size:10pt;\\n\\t\\tdisplay:flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tcolor:white;\\n\\t\\tcursor: pointer;\\n\\t}\\n\\n\\t @media (max-width: 500pt){\\n\\t\\t nav {\\n\\t\\t\\t display:flex;\\n\\t\\t\\t flex-direction: column;\\n\\t\\t\\t align-items: center;\\n\\t\\t\\t height:auto;\\n\\t\\t }\\n\\n\\t\\t nav .link-holder {\\n\\t\\t\\t margin-top:8pt;\\n\\t\\t\\t display: grid;\\n\\t\\t\\t grid-template-columns: 1fr 1fr 1fr 1fr;\\n\\t\\t }\\n\\t }\\n\\n</style>\\n\\n<nav>\\n\\t<img class='logo' src='logo96.png' alt='uec logo'/>\\n\\n\\t<div class='link-holder'>\\n\\t\\t<a class='link' href='.'>home</a>\\n\\t\\t<a class='link' href='about'>about</a>\\n\\t\\t<a class='link' href='sponsors'>sponsors</a>\\n\\t\\t<a class='link' href='contact'>contact</a>\\n\\t</div>\\n</nav>\\n\\n{#if !closed}\\n<div transition:fade=\\\"{{duration:120}}\\\" class='banner' style={banner.message ? null : 'display: None'}>\\n<p style='color:white; text-align:left;'>{banner.message ? null : 'display: None'}</p>\\n<span on:click={() => closed = true} class=\\\"banner-close material-icons\\\"> check_box </span>\\n</div>\\n{/if}\"],\"names\":[],\"mappings\":\"AAaC,GAAG,4BAAC,CAAC,AACJ,MAAM,CAAE,IAAI,CACZ,QAAQ,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,YAAY,IAAI,CAChB,aAAa,CAAE,IAAI,AACpB,CAAC,AAED,iBAAG,CAAC,KAAK,cAAC,CAAC,AACV,OAAO,IAAI,AACZ,CAAC,AAED,iBAAG,CAAC,YAAY,cAAC,CAAC,AACjB,OAAO,CAAC,AACT,CAAC,AAED,iBAAG,CAAC,KAAK,cAAC,CAAC,AACV,KAAK,CAAE,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CACrB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,cAAc,CAAE,UAAU;CAC3B,CAAC,AAED,iBAAG,CAAC,mBAAK,MAAM,AAAC,CAAC,AAChB,eAAe,CAAE,SAAS,AAC3B,CAAC,AAED,iBAAG,CAAC,mBAAK,QAAQ,AAAC,CAAC,AAClB,KAAK,CAAE,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,AACtB,CAAC,AAED,OAAO,4BAAC,CAAC,AACR,WAAW,OAAO,CAClB,MAAM,KAAK,CACX,WAAW,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,UAAU,GAAG,CACb,QAAQ,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,UAAU,CAAE,UAAU,AACvB,CAAC,AAED,yCAAa,CAAC,AACb,cAAc,IAAI,CAClB,UAAU,IAAI,CACd,QAAQ,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,KAAK,CACX,MAAM,CAAE,OAAO,AAChB,CAAC,AAEA,MAAM,AAAC,YAAY,KAAK,CAAC,CAAC,AACzB,GAAG,4BAAC,CAAC,AACJ,QAAQ,IAAI,CACZ,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,OAAO,IAAI,AACZ,CAAC,AAED,iBAAG,CAAC,YAAY,cAAC,CAAC,AACjB,WAAW,GAAG,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,AACvC,CAAC,AACF,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$6);

	return `${($$result.head += `<link href="${"https://fonts.googleapis.com/icon?family=Material+Icons"}" rel="${"stylesheet"}">`, "")}



<nav class="${"svelte-urh0tn"}"><img class="${"logo svelte-urh0tn"}" src="${"logo96.png"}" alt="${"uec logo"}">

	<div class="${"link-holder svelte-urh0tn"}"><a class="${"link svelte-urh0tn"}" href="${"."}">home</a>
		<a class="${"link svelte-urh0tn"}" href="${"about"}">about</a>
		<a class="${"link svelte-urh0tn"}" href="${"sponsors"}">sponsors</a>
		<a class="${"link svelte-urh0tn"}" href="${"contact"}">contact</a></div></nav>

${ `<div class="${"banner svelte-urh0tn"}"${add_attribute("style",  "display: None", 0)}><p style="${"color:white; text-align:left;"}">${escape( "display: None")}</p>
<span class="${"banner-close material-icons svelte-urh0tn"}">check_box </span></div>`
	}`;
});

/* src/components/Footer.svelte generated by Svelte v3.20.1 */

const css$7 = {
	code: ".svelte-xthiq5{text-align:center;color:rgba(0,0,0,.6)}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\n    export let segment;\\n    let dt = new Date();\\n    $: year = dt.getFullYear()\\n</script>\\n\\n<style>\\n*{\\n    text-align: center;\\n    color:rgba(0,0,0,.6);\\n}\\n</style>\\n\\n<footer>\\n    <p> © University of Western Australia Engineers' Club - {year}</p>\\n    <p>\\\"<em>non loqui, sed facere\\\"</em></p>\\n    <p>Add us on <a href='https://www.facebook.com/universityengineersclub'>Facebook</a>, and <a href=\\\"https://www.linkedin.com/company/university-engineers-club-1921/\\\">LinkedIn</a></p>\\n</footer>\\n\"],\"names\":[],\"mappings\":\"AAOA,cAAC,CAAC,AACE,UAAU,CAAE,MAAM,CAClB,MAAM,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,AACxB,CAAC\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	let dt = new Date();
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$7);
	let year = dt.getFullYear();

	return `<footer class="${"svelte-xthiq5"}"><p class="${"svelte-xthiq5"}">© University of Western Australia Engineers&#39; Club - ${escape(year)}</p>
    <p class="${"svelte-xthiq5"}">&quot;<em class="${"svelte-xthiq5"}">non loqui, sed facere&quot;</em></p>
    <p class="${"svelte-xthiq5"}">Add us on <a href="${"https://www.facebook.com/universityengineersclub"}" class="${"svelte-xthiq5"}">Facebook</a>, and <a href="${"https://www.linkedin.com/company/university-engineers-club-1921/"}" class="${"svelte-xthiq5"}">LinkedIn</a></p></footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.20.1 */

const css$8 = {
	code: "main.svelte-168jntx{position:relative;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}@media(max-width: 500pt){main.svelte-168jntx{padding:8pt}}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nav from '../components/Nav.svelte';\\n\\timport Footer from '../components/Footer.svelte';\\n\\texport let segment;\\n</script>\\n\\n<style>\\n\\n\\tmain {\\n\\t\\tposition: relative;\\n\\t\\tbackground-color: white;\\n\\t\\tpadding: 2em;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\t@media (max-width: 500pt) {\\n        main{\\n\\t\\t\\tpadding:8pt;\\n\\t\\t}\\n    }\\n\\n</style>\\n\\n<Nav {segment}/>\\n\\n<main>\\n\\t<slot></slot>\\n</main>\\n\\n<Footer {segment}/>\"],\"names\":[],\"mappings\":\"AAQC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpB,mBAAI,CAAC,AACV,QAAQ,GAAG,AACZ,CAAC,AACC,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$8);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main class="${"svelte-168jntx"}">${$$slots.default ? $$slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, { segment }, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.20.1 */

const css$9 = {
	code: "h1.svelte-b0b7k9,p.svelte-b0b7k9{margin:0 auto}h1.svelte-b0b7k9{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-b0b7k9{margin:1em auto}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\timport { fade, fly } from 'svelte/transition';\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\t\\n</style>\\n\\n<svelte:head>\\n\\t<title>Error {status}! </title>\\n</svelte:head>\\n\\n<div transition:fade=\\\"{{duration:120}}\\\">\\n\\t<h1>Error: {status}</h1>\\n\\n\\t<p>{error.message}</p>\\n\\n\\t{#if dev && error.stack}\\n\\t\\t<pre>{error.stack}</pre>\\n\\t{/if}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AASC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$9);

	return `${($$result.head += `${($$result.title = `<title>Error ${escape(status)}! </title>`, "")}`, "")}

<div><h1 class="${"svelte-b0b7k9"}">Error: ${escape(status)}</h1>

	<p class="${"svelte-b0b7k9"}">${escape(error.message)}</p>

	${ ``}</div>`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		},

		{
			// sponsors.svelte
			pattern: /^\/sponsors\/?$/,
			parts: [
				{ name: "sponsors", file: "sponsors.svelte", component: Sponsors }
			]
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: Contact }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.20.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware({
			session: (req,res) => {
				 req.user;
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
