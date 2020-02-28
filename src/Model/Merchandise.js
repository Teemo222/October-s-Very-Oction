class Merchandise{
  constructor(itemId, itemName, itemCategory, itemDescription, itemImageSrc) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemDescription = itemDescription;
    this.itemImageSrc = itemImageSrc;
  }
}

let count = 0;
const allItems = [];

export function addItem(itemName, itemCategory, itemDescription, itemImageSrc){
  for (let i = 0; i < allItems.length; i++){
    if (allItems[i].itemName == itemName){
      return false;
    }
  }
  allItems.push(new Merchandise(count, itemName, itemCategory, itemDescription, itemImageSrc));
  count ++;
  return true;
}

export function getAllItems(){
  return allItems;
}

export function filterByKeyword(originalList, keyword){
  const result = []
  for (let i = 0; i < originalList.length; i++){
    console.log(originalList[i].itemName)
    console.log(keyword)
    if (originalList[i].itemName.includes(keyword)){
      result.push(originalList[i])
    }
  }
  return result;
}

export function filterByCategory(originalList, category){
  const result = []
  for (let i = 0; i < originalList.length; i++){
    if (originalList[i].category == category){
      result.push(originalList[i])
    }
  }
  return result;
}

addItem("a3", "SNEAKERS", "c", "d");
addItem("a1", "WATCHES", "c1", "d1");
addItem("a2", "BAGS", "c2", "d2");
console.log(allItems)

export default Merchandise