const add = (a1, a2) => a1.map((ai,i)=> ai+a2[i])
const sub = (a1, a2) => a1.map((ai,i)=> ai-a2[i])
const mul = (a1, a2) => a1.map((ai,i)=> ai*a2[i])
const div = (a1, a2) => a1.map((ai,i)=> ai/a2[i])
const mod = (a1, a2) => a1.map((ai,i)=> ai%a2[i])
const pow = (a1, a2) => a1.map((ai,i)=> ai**a2[i])

Array.prototype.add = function(c) { return this.map(ai=> ai+c) }
Array.prototype.sub = function(c) { return this.map(ai=> ai-c) }
Array.prototype.mul = function(c) { return this.map(ai=> ai*c) }
Array.prototype.div = function(c) { return this.map(ai=> ai/c) }
Array.prototype.mod = function(c) { return this.map(ai=> ai%c) }
Array.prototype.pow = function(c=2) { return this.map(ai=> ai**c) }
Array.prototype.max = function() {
	let len = this.length,
		max = -Infinity;
	while (len--) max = this[len]>max? this[len] : max;
	return max;
}
Array.prototype.min = function() {
	let len = this.length,
		min = Infinity;
	while (len--) min = this[len]<min? this[len] : min;
	return min;
}
Array.prototype.unq = function() { return [...new Set(this)].sort((a,b)=>a-b) }

const len = (a, w=0) => w? w.reduce((t,ai)=>t+ai) : a.length
const sum = (a, w=0) => w? mul(a, w).reduce((t,ai)=>t+ai) : a.reduce((t,ai)=>t+ai)
const sumsq = (a, w=0) => sum(a.pow(), w)
const prod = (a, w=0) => w? a.reduce((t,ai,i)=>t*ai**w[i], 1) : a.reduce((t,ai)=>t*ai)
const mean = (a, w=0) => sum(a, w)/len(a, w)
const gmean = (a, w=0) => w? prod(a.pow(1/sum(w))) : prod(a.pow(1/a.length))

const dis = (a, w=0) => a.sub(mean(a, w))
const sst = (a, w=0) => sumsq(dis(a, w), w)
const vr = (a, w=0) => sst(a, w)/(len(a, w)-1)
const vrp = (a, w=0) => sst(a, w)/len(a, w)
const sd = (a, w=0) => vr(a, w)**.5
const sdp = (a, w=0) => vrp(a, w)**.5

const cov = (a1, a2, w=0) => sum(mul(dis(a1, w), dis(a2, w)), w)/(len(a1, w)-1)
const covp = (a1, a2, w=0) => sum(mul(dis(a1, w), dis(a2, w)), w)/len(a1, w)
const cor = (a1, a2, w=0) => cov(a1, a2)/sd(a1, w)/sd(a2, w)
const corp = (a1, a2, w=0) => covp(a1, a2)/sdp(a1, w)/sdp(a2, w)

const histo = {
	k: (a, w=0, k='sqrt') => {
		if (k==='sqrt') return Math.ceil(len(a, w)**.5);
		if (k==='sturges') return Math.ceil(Math.log2(len(a, w)))+1;
		if (k==='rice') return Math.ceil(2*len(a, w)**(1/3));
		return Math.ceil(k);
	},
	bin: (a, w=0, k='sqrt', mi=null, ma=null) => {
		k = histo.k(a, w, k);
		mi = mi===null? a.min() : mi;
		ma = ma===null? a.max() : ma;
		let wi = (ma-mi)/k,
			b = [];
		for (var i=0; i<k; i++) {
			b[i] = {};
			b[i].btm = mi+i*wi;
			b[i].mid = b[i].btm+wi/2;
			b[i].top = Number((b[i].btm+wi).toFixed(12));
			b[i].f = 0;
			if (i===0) b[i].btm--;
			if (w) a.forEach((aj,j)=> { if (b[i].btm<aj&&aj<=b[i].top) b[i].f += w[j] });
			else a.forEach(aj=> { if (b[i].btm<aj&&aj<=b[i].top) b[i].f++ });
			if (i===0) b[i].btm++;
		}
		return b;
	}
}

const histoSpline = {
	k: (a, w=0, k='sqrt') => {
		if (k==='sqrt') return Math.ceil(len(a, w)**.5);
		if (k==='sturges') return Math.ceil(Math.log2(len(a, w)))+1;
		if (k==='rice') return Math.ceil(2*len(a, w)**(1/3));
		return Math.ceil(k);
	},
	bin: (a, w=0, k='sqrt', mi=null, ma=null) => {
		k = histo.k(a, w, k);
		mi = mi===null? a.min() : mi;
		ma = ma===null? a.max() : ma;
		let wi = (ma-mi)/k,
			b = [];
		for (var i=0; i<k; i++) {
			b[i] = {};
			b[i].btm = mi+i*wi;
			b[i].mid = b[i].btm+wi/2;
			b[i].top = Number((b[i].btm+wi).toFixed(12));
			b[i].f = 0;
			if (i===0) b[i].btm--;
			if (w) a.forEach((aj,j)=> { if (b[i].btm<aj&&aj<=b[i].top) b[i].f += w[j] });
			else a.forEach(aj=> { if (b[i].btm<aj&&aj<=b[i].top) b[i].f++ });
			if (i===0) b[i].btm++;
		}
		b.unshift({btm: b[0].btm-wi, mid: b[0].mid-wi, top: b[0].top-wi, f: 0});
		let x = b.length-1;
		b.push({btm: b[x].btm+wi, mid: b[x].mid+wi, top: b[x].top+wi, f: 0});
		return b;
	}
}

const quartile = (a, c, w=0) => {
	let pos = (len(a, w)-1) * c,
		base = Math.floor(pos),
		wbase = [wpos(base, w), wpos(base+1, w)];
	return typeof a[wbase[1]]===undefined? a[wbase[0]] : a[wbase[0]]+(pos-base)*(a[wbase[1]]-a[wbase[0]]);
}

const wpos = (c, w=0) => {
	if (w==0) return c;
	let ii = 0;
	w.forEach((wi,i) => {
		if ((ii+=wi)>c) return i;
	});
	return null;
}

const rank = (a, w=0) => {
	var c = {},
		r = a.unq(),
		p = 0;
	if (w) a.forEach((ai,i) => { c[ai] = (c[ai]||0)+w[i] });
	else a.forEach(ai => { c[ai] = (c[ai]||0)+1 });
	r.forEach((ri,i) => { r[i] = [ri, (p+1+p+c[ri])/2]; p += c[ri]; });
	return r;
}
