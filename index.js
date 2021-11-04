// require("dotenv").config();
// const fs = require('fs');
//Single Responsibility
class Journal
{
    constructor(){
        this.entries={};
    }
    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}:${text}`
        this.entries[c] = entry;
        return c;
    }
    removeEntry(idx){
        delete this.entries[idx]
    }
    toString(){
        return Object.values(this.entries).join('\n');
    }
}
class PersistentManger{
    constructor(){}
    save(journal, fileName){
        fs.writeFileSync(fileName, journal.toString())
    };
}
Journal.count = 0;

let journal = new Journal();
journal.addEntry('I lough today!');
journal.addEntry('I eat Orange!');
journal.addEntry('I went to grocery')

// let fileName = process.env.FILE_NAME;


// let p = new PersistentManger();
// p.save(journal, fileName);

//Open-Closed Principle => states that objects are open for extension but closed for modification
const Color = Object.freeze({
    red:'red',
    green:'green',
    blue:'blue'
});
const Size = Object.freeze({
    small:'small',
    medium:'medium',
    large:'large'
})
class Product {
	constructor(name, size, color, price) {
		this.name = name;
		this.size = size;
		this.color = color;
		this.price = price;
	}
}

// class ProductFilter{
//     filterByColor(product,color){
//         return product.filter(p=>p.color===color)
//     }
//     filterBySize(product, size){
//         return product.filter(p=>p.size === size);
//     }
//     filterByColorAndSize(product, size, color){
//         return product.filter(p=> 
//             p.color === color && p.size===size
//         )
//     }
// }
class ColorSpecification {
	constructor(color){
		this.color = color;
	}
	isSatisfied(item){
        return this.color === item.color;
    }
}
class SizeSpecification{
    constructor(size){
        this.size=size;
    }
    isSatisfied(item){
        return item.size === this.size;
    }
}
class PriceSpecification{
    constructor(price){
        this.price=price;
    }
    isSatisfied(item){
        return item.price > this.price;
    }
}
const apple = new Product('apple', Size.small, Color.green,12.99);
const house = new Product('house', Size.large,Color.blue,49.99);
const tree = new Product('tree',  Size.large, Color.green,99.99);
const car = new Product('car', Size.large, Color.green, 31.99)


let pr = [apple, house, tree, car];

class BetterFilter{
    filter(items,spec){
        return items.filter(item=> spec.isSatisfied(item));
    }
}
class AndFilter{
    constructor(...specs){
        this.specs = specs
    }
    isSatisfied(item){
        return this.specs.every(s=>s.isSatisfied(item))
    }
}
const bf = new BetterFilter();

function filterBySpecs(products, specifications) {
	for (let p of bf.filter(products, specifications)) {
		console.log(p.name);
	}
}




const selectColorElement = document.querySelector(".selectColor");
const selectSizeElement = document.querySelector('.selectSize');
let specsOfTShirt = {
    
}
selectColorElement.addEventListener("input", (e) => {
	// console.log(e.target.value);
    specsOfTShirt.color=e.target.value;
    if(specsOfTShirt.color && specsOfTShirt.size){
        console.log(specsOfTShirt);
        filterBySpecs(
			pr,
			new AndFilter(
				new ColorSpecification(specsOfTShirt.color),
				new SizeSpecification(specsOfTShirt.size)
			)
		);

    }
});
selectSizeElement.addEventListener("input", (e) => {
	if(!e.target.value){
        console.log("you must chose size");
        return;
    }
    specsOfTShirt.size = e.target.value;
     if (specsOfTShirt.color && specsOfTShirt.size) {
         console.log(specsOfTShirt);
			filterBySpecs(
				pr,
				new AndFilter(
					new ColorSpecification(specsOfTShirt.color),
					new SizeSpecification(specsOfTShirt.size)
				)
			);
		}
});


// let specsColorSizePrice = new AndFilter(
// 	new ColorSpecification(Color.green),
// 	new SizeSpecification(Size.large),
// 	new PriceSpecification(10)
// );

// filterBySpecs(pr, specsColorSizePrice);

// const specsPrice = new AndFilter(new ColorSpecification(specsOfTShirt.color));
// console.log("***************");
// filterBySpecs(pr, specsPrice);

// console.log("***************");
// filterBySpecs(pr, new SizeSpecification(specsOfTShirt.size));
// console.log(specsColorSizePrice);
