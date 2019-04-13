const trans = M => M[0].map((col, i) => M.map(row => row[i]))

const combi = A => {
	if (A.length == 1) return A[0];
	else {
		var result = [];
		A[0].forEach(a => {
			combi(A.slice(1)).forEach(b => {
				result.push([a].concat(b));
			});
		});
		return result;
	}
}

const msort = (M, i) => trans(trans(M).sort((a,b) => a[i]>b[i]? 1 : (a[i]<b[i]? -1 : 0)));

const split = (M, g) => M[g].unq().map(cat => trans(trans(M).filter(di=>di[g]===cat)));
