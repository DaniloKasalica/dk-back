const sql = require("./db.js")

const bcrypt = require('bcryptjs')


const createtableseller = `CREATE TABLE IF NOT EXISTS Seller  (
    SellerID int(11) NOT NULL auto_increment,
    Name varchar(50) NOT NULL UNIQUE,
    Number varchar(50) NOT NULL,
    Email varchar(255) NOT NULL,
    IsActive BOOLEAN  DEFAULT FALSE,
    Paid BOOLEAN DEFAULT FALSE,
    Packet int(1) DEFAULT 1 NOT NULL,
    Password varchar(150),
    Description varchar(1000),
    PRIMARY KEY (SellerID)
    )`

const createtablesellerimages = `CREATE TABLE IF NOT EXISTS Sellerimages (
  ImageID int(11) NOT NULL auto_increment,
  SellerID int(11) NOT NULL,
  Url varchar(100) NOT NULL,
  Main BOOLEAN  DEFAULT FALSE,
  FOREIGN KEY (SellerID) REFERENCES Seller(SellerID),
  PRIMARY KEY (ImageID)
)`

    const createtablesort = `CREATE TABLE IF NOT EXISTS Sorts(
      Sort varchar(30),
       Type varchar(30),
       FOREIGN KEY (Type) REFERENCES Type(Type),
       PRIMARY KEY (Sort)
    )`

    const createtabletype = `CREATE TABLE IF NOT EXISTS Type(
      Type varchar(30),
      PRIMARY KEY (Type)
    )`



  const createtableproducts = `CREATE TABLE IF NOT EXISTS Products(
      ProductID int(11) NOT NULL auto_increment,
      SellerID int(11),
      ProductName varchar(30) NOT NULL,
      Sort varchar(30),
      Price float(10),
      IsDiscount BOOLEAN DEFAULT FALSE,
      Quantity int (11),
      Unit varchar(40),
      SellNum int(10) default 0,
      PRIMARY KEY (ProductID),
      FOREIGN KEY (SellerID) REFERENCES Seller(SellerID),
      FOREIGN KEY (Sort) REFERENCES Sorts(Sort)
    )`




const createtableproductimages = `CREATE TABLE IF NOT EXISTS Productimages (
  ImageID int(11) NOT NULL auto_increment,
  ProductID int(11) NOT NULL,
  Url varchar(100) NOT NULL,
  Main BOOLEAN  DEFAULT FALSE,
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
  PRIMARY KEY (ImageID)
)`


const createtabletowns = `CREATE TABLE IF NOT EXISTS Towns(
        Town varchar(20) NOT NULL,
        Latitude float(12) NOT NULL,
        Longitude float(12) NOT NULL,
        PRIMARY KEY (Town)
      )`
  


      const createtableshippingdetail = `CREATE TABLE IF NOT EXISTS Shippingdetail(
        ShippingID int(1) NOT NULL auto_increment,
        Town varchar(20),
        ProductID int(11),
        Time int(1),
        PRIMARY KEY (ShippingID),
        FOREIGN KEY (Town) REFERENCES Towns(Town),
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
      )`
  


      const createtableusers = `CREATE TABLE IF NOT EXISTS Users(
        UserID int(11) NOT NULL auto_increment,
        Email varchar(30) UNIQUE,
        Number varchar(55),
        Username varchar(20) NOT NULL UNIQUE,
        Password varchar(150) NOT NULL,
        CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (UserID)
      )`






  const createtableorder = `CREATE TABLE IF NOT EXISTS Orders(
        OrderID int(11) NOT NULL auto_increment,
        UserID int(11),
        TotalAmount float(10),
        OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (OrderID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      )`


  const createtableproductorder = `CREATE TABLE IF NOT EXISTS OrderProducts(
      OrderProductID int(11) NOT NULL auto_increment,
      OrderID int(11) NOT NULL,
      ProductID int(11)  NOT NULL,
      Quantity int(11),
      Price float(8),
      PRIMARY KEY (OrderProductID),
      FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
      FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
    )`





    const createtabletoken = `CREATE TABLE IF NOT EXISTS Token  (
        TOKEN varchar(255) 
      );`

    



    const createtablecart = `CREATE TABLE IF NOT EXISTS Cart(
      CartID int(11) NOT NULL auto_increment,
      UserID int(11) Unique,
      TotalAmount float(10),
      OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (CartID),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    )`
  const createtableproductcart = `CREATE TABLE IF NOT EXISTS Cart_Products(
      CartProductID int(11) NOT NULL auto_increment,
      CartID int(11) NOT NULL,
      ProductID int(11)  NOT NULL,
      Quantity int(11),
      Price float(8),
      PRIMARY KEY (CartProductID),
      FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
      FOREIGN KEY (CartID) REFERENCES Cart(CartID)
    )`
    
  sql.query(createtabletowns, (err,data)=>{
    if(err)
    console.log(err)
    console.log('je')
  })
    sql.query(createtabletype,(err,data)=>{
      if(err){
        console.log(err)
      }
    })
      sql.query(createtablesort,(err,data)=>{
      if(err){
        console.log(err)
      }
    })
    sql.query(createtableusers,(err,data)=>{
      if(err){
        console.log(err)
      }
    })
     sql.query(createtableseller, (err,data)=>{
      if(err)
      console.log(err)
    })
    sql.query(createtabletoken, (err,data)=>{
     if(err)
     console.log(err)
   })
   sql.query(createtableproducts, (err,data)=>{
    if(err)
    console.log(err)
  })
  sql.query(createtableorder, (err,data)=>{
   if(err)
   console.log(err)
 })

 sql.query(createtableproductorder, (err,data)=>{
    if(err)
    console.log(err)
  })

  sql.query(createtablecart, (err,data)=>{
    if(err)
    console.log(err)
  })
  
  sql.query(createtableproductcart, (err,data)=>{
    if(err)
    console.log(err)
  })
  sql.query(createtableshippingdetail, (err,data)=>{
    if(err)
    console.log(err)
  })

  sql.query(createtablesellerimages,(err,data)=>{
    if(err)
    console.log(err)
  })
  sql.query(createtableproductimages,(err,data)=>{
    if(err)
    console.log(err)
  })


  const  Module = {}
  Module.query = ( query,args ) => {
      return new Promise( ( resolve, reject ) => {
          sql.query( query, args, ( err, rows ) => {
              if ( err )
                return  reject( err );
                resolve(rows)
          });
      });
  }

  async function unos (){
    const password1 = await bcrypt.hash('Danilo12', 10)
    const password2 = await bcrypt.hash('Danilo12', 10)
    return Promise.resolve([password1,password2])
   
   }  

   /* 
   unos()
   .then((password)=>{
   sql.query(`
     INSERT INTO Users (Email,Username,Password,Number)
     VALUES ('danilo.kasalica@gmail.com','Danilo12','${password[0]}','68846666');
 
     INSERT INTO Users (Email,Username,Password,Number)
    VALUES ('danilo.kasalica@gmail.com2','Danilo2','${password[0]}','68846666');

     INSERT INTO Users (Email,Username,Password,Number)
      VALUES ('danilo.kasalica@gmail.com3','Danilo3','${password[0]}','68846666');

`
     )





      sql.query(`
     INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo1','068846666','danilo.kasalica@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');
 
      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo2','068846666','danilo.kasalica2@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo3','068846666','danilo.kasalica3@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo4','068846666','danilo.kasalica4@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo5','068846666','danilo.kasalica5@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo6','068846666','danilo.kasalica6@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo7','068846666','danilo.kasalica7@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');

      INSERT INTO Seller (Name,Number,Email,IsActive,Paid,Packet,Password,Description)
      VALUES ('Danilovo Gazdinvo8','068846666','danilo.kasalica8@gmail.com',true,true,1,'${password[0]}','opis prvog prodavca sodska doksadok sakdosa kskoa dkosa dkok asdoksad okdsa o kodsakods oka sdkodsa o');
`
     )
     sql.query(`
     INSERT INTO Sellerimages (url,SellerID,Main) VALUES ('/seler[1].jpg',1,true);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[2].jpg',1);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[2].jpg',1);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[2].jpg',1);
     INSERT INTO Sellerimages (url,SellerID,Main) VALUES ('/seler[2].jpg',2,true);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[1].jpg',2);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[2].jpg',2);
     INSERT INTO Sellerimages (url,SellerID,Main) VALUES ('/seler[2].jpg',3,true);
     INSERT INTO Sellerimages (url,SellerID) VALUES ('/seler[1].jpg',3);
     `)
      sql.query(`
     INSERT INTO Type (Type) VALUES ('Voće');
     INSERT INTO Type (Type) VALUES ('Povrće');
     INSERT INTO Type (Type) VALUES ('Ostalo');
     `
   )
   sql.query(`
     INSERT INTO Sorts (Sort,Type) VALUES ('Jabuka','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Kruska','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Jagoda','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Trešnja','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Višnja','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Malina','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Japanska jabuka','Voće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Vocka','Voće');
     
     INSERT INTO Sorts (Sort,Type) VALUES ('Zelena salata','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Blitva','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Kupus','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Blita','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Spanac','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Rastan','Povrće');
     INSERT INTO Sorts (Sort,Type) VALUES ('Krastavac','Povrće');

     
     INSERT INTO Sorts (Sort,Type) VALUES ('Mlijeko','Ostalo');
     INSERT INTO Sorts (Sort,Type) VALUES ('Sir','Ostalo');
     INSERT INTO Sorts (Sort,Type) VALUES ('Svinjsko meso','Ostalo');
     INSERT INTO Sorts (Sort,Type) VALUES ('Jagnjece','Ostalo');

     `
   );

 sql.query(`
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (1,'Plavi krastavac','Krastavac',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (1,'Planinski krastavac','Krastavac',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (1,'Kupus neki','Kupus',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (1,'Mlijekoneko','Mlijeko',2.20,100,'gr');

 
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (2,'prvi krastavac','Krastavac',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (2,'prva malina','Malina',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (2,'kupus','Kupus',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (2,'mlijekoslatko','Mlijeko',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (2,'drugi krastavac','Krastavac',2.20,100,'gr');


 
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit)
 VALUES (3,'prvi krastavac','Krastavac',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit)
 VALUES (3,'prvi malina','Malina',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit)
 VALUES (3,'prvi kupus','Kupus',2.20,100,'gr');
 INSERT INTO Products (SellerID,ProductName,Sort,Price,Quantity,Unit) 
 VALUES (3,'drugi kupus','Kupus',2.20,100,'gr');
 `
)

     sql.query(`
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[1].jpg',1,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',1);
     INSERT INTO Productimages (url,Productid) VALUES ('/seler[2].jpg',1);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',2,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',2);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',2);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',3,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',3);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',3);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',4,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',4);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',4);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',5,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',5);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',5);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',6,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',6);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',6);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',7,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',7);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',7);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',8,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',8);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',8);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',9,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',9);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',9);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',10,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',10);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',10);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',11,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',11);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',11);
     INSERT INTO Productimages (url,ProductID,Main) VALUES ('/seler[2].jpg',12,true);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[2].jpg',12);
     INSERT INTO Productimages (url,ProductID) VALUES ('/seler[1].jpg',12);
     `)

sql.query(`
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Nikšić',42.77361,18.94444);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Podgorica',42.44111,19.26278);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Pljevlja',43.36000,19.36000);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Bar',42.08056,19.10972);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Herceg Novi',42.45306,18.53111);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Berane',42.84444,19.87361);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Ulcinj',41.92000,19.20000);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Tivat',42.43000,18.70000);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Kotor',42.41861,18.76722);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Budva',42.28806,18.84250);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Igalo',42.45889,18.51222);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Bijela',42.45333,18.65556);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Risan',42.51472,18.69500);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Petrovac',42.20556,18.94250);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Žabljak',43.15500,19.12083);
INSERT INTO Towns (Town,Latitude,Longitude) 
VALUES ('Bijelo Polje',43.03611,19.75000);
`
)


sql.query(`
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',1,6);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',1,6);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Žabljak',1,6);

INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',2,3);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',3,4);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',4,1);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',5,8);


INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',5,3);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',6,4);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',6,1);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',7,8);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',8,3);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',9,4);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',10,1);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',10,8);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',11,3);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',11,4);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Nikšić',12,1);
INSERT INTO Shippingdetail (Town,ProductID,Time) 
VALUES ('Podgorica',12,8);
`
)

   })
 
*/


module.exports = Module;