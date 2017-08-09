
fi = (function() {
	return {
		libraryMethod: function() {return 'something'}, 
		each: function each(list, iteratee){
			if (Array.isArray(list)){
				for (let i = 0; i<list.length; i++){
					iteratee(list[i], i, list)
					}
				}
			else { for (var key in list) {
		  		if (list.hasOwnProperty(key)) {
		    		iteratee(list[key], key, list)
		    		}
		    	}
		  	}
		  	return list
		},
		map: function map(list, iteratee){
			if (Array.isArray(list)){
				let newArr = []
				for (let i = 0; i<list.length; i++){
					newArr.push(iteratee(list[i]))
					}
				return newArr
				}
			else { 
				let newObj = Object.assign({}, list)
				for (var key in newObj) {
			  		if (newObj.hasOwnProperty(key)) {
			  			newObj[key] = iteratee(newObj[key], key, newObj)
			    		}
		    	}
		    	//return Object.values(newObj) --> this returns an array of values
		    	return newObj //returns an object
		  	}
		},
		reduce: function reduce(list, iteratee, memo){
			if (Array.isArray(list)){
				for (let i = 0; i<list.length; i++){
					if (memo === undefined) {
						memo = list[i]
					} else {
						memo = iteratee(memo, list[i], i, list)
						}
					}
				}
				return memo
		},
		find: function find(list, predicate) {
			let result

			for (let i in list) {
				if (predicate(list[i])) {
					result = list[i];
					break
				}
				
			}
			return result
		},
		filter: function filter(list, predicate) {
			let result = []

			for (let i in list) {
				if (predicate(list[i])) {
					result.push(list[i])
				}
			}
			return result
		},
		sortBy: function sortBy(list, iteratee){
			// return fi.map(list, function(element){
			// 	iteratee(element)
			// })
			let newArr = []
			let negArr = []
			let posArr = []
			let finalArr = []
			// let keyValue = Object.assign({}, list)
			if (typeof iteratee === 'function') {
				for (let i in list){
					// keyValue[list[i]] = iteratee(list[i])
					let temp = iteratee(list[i])
					if (temp < 0) {
						negArr.push(temp)
					}
					else {
						posArr.push(temp)
					}
					newArr = negArr.sort().reverse().concat(posArr.sort())
				}
				// console.log(newArr)
				fi.each(newArr, function(element) {
						let a = fi.find(list, function(j) {
						console.log(j);
						return element === iteratee(j)
					})
					finalArr.push(a)
					
				})
			return finalArr
			} else {
				return list.sort(function(a, b){
					if (a[iteratee] < b[iteratee]){
						return -1
					}
					if (a[iteratee] > b[iteratee]){
						return 1
					}
					return 0
				})
			}
	

		},
		size: function size(list){
			var newList = Object.keys(list)
			var count = 0
			fi.each(newList, function(element){
				count++
			})
			return count
		}, 
		first: function first(array, n){
			let returnArr = []
			for(let i = 0; i < n; i++){
				returnArr.push(array[i])
			}
			return returnArr
		},
		last: function last(array, n) {
			let result = array.reverse()
			return result.slice(0, n)
		},
		compact: function compact(array){
			var newArr = []
			for (var i = 0; i<array.length; i++) {
				if (array[i] != false){
					newArr.push(array[i])
				}
			}
			return newArr
		},
		values: function values(object){
			let newArr = []
			for (let i in object) {
				newArr.push(object[i])
			}
			return newArr
		}, 
		bind: function bind(func, object, ...params) {
			// let log = fi.bind(console.log, object)
			// log('arg') => 

			// object.func = func
			// return function() {
			// 	return object.func(...params)
			// }

			return function() {
				return func.apply(object, params)
			}
		}

	}}) ()






























