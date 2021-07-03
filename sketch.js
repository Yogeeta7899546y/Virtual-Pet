var dog,sadDog,happyDog;
var foodObj;
var foods,foodStock;
var fedTime,lastFed,feed,addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodObj=new food()
  foodStock=database.ref('food')
  foodStock.on('value',readStock)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
feed=createButton('feedTheDog')
feed.position(700,95)
feed.mousePressed(feedDog)
addFood=createButton("addFood")
food.position(800,90)
food.mousePressed(addFoods)
}

function draw() {
  background(46,139,87);
  foodObj.display()
  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  }
  )
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text('lastFed'+lastFed%12,350,30)
}
else if(lastFed===0){
  text('lastFed=12am',350,30)
}
else{
  text('lastFed'+lastFed,350,30)
}
  drawSprites();
}

//function to read food Stock

function readStock(data){
  foods=data.val()
  foodObj.updateFoodStock(foods)
}
//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    food:foods
  })
}

//function to add food in stock
