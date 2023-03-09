    import {promises as fs, read} from "fs";
    export default class ProductManager {
        constructor(){
            this.patch = "./productos.txt"
            this.products = [];

        }
        static id = 0

        addProduct =async (title, description, price, img, code, stock) =>{
            ProductManager.id++

            let newProduct = {
                title,
                description,
                price,
                img,
                code, 
                stock, 
                id: ProductManager.id
            }
            this.products.push(newProduct)
            await fs.writeFile (this.patch, JSON.stringify(this.products))
        }

        readProducts = async () => {
            let respuesta = await fs.readFile (this.patch, "utf-8") ;
            return JSON.parse(respuesta);
        }
        
        getProducts =   async () => {
            let respuesta2 = await this.readProducts ();
            return console.log (respuesta2);
    
        }
        getProductsById = async (id) => {
            let respuesta3 = await this.readProducts ();
            if (!respuesta3.find(product =>product.id === id)) {
                console.log ("Producto no encontrado")
            } else {
                console.log (respuesta3.find(product =>product.id === id))
            }
        }
       denoleteProductsById = async (id) => {
            let respuesta3 = await this.readProducts();
            let productFilter = respuesta3.filter(products => products.id != id)
            await fs.writeFile (this.patch, JSON.stringify(productFilter));
        }
        updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById (id);
        let productOld= await this.readProducts();
        console.log (productOld)    
        let productsModif = [
            {id, ...producto},
            ...productOld
        ]
        await fs.writeFile (this.patch, JSON.stringify(productsModif));
        }
    };

   
    

/*     const productos = new ProductManager(); */
/*     productos.addProduct("title1", "Description1", 1150, "Image1", "abc123", 5)
    productos.addProduct("title12", "Description123", 115, "Image1", "abc123", 6)
    productos.addProduct("title123", "Description1234", 115210, "Image1", "abc123", 7)
    productos.addProduct("title1234", "Description12345", 113520, "Image116", "abc123", 8)
    productos.addProduct("title12345", "Description123456", 114520, "Image115", "abc123", 9)
    productos.addProduct("title123456", "Description1234567", 1134520, "Image141", "abc123", 10)
    productos.addProduct("title123456", "Description12345678", 11523420, "Image131", "abc123", 11)
    productos.addProduct("title1234567", "Description129", 115203, "Image121", "abc123", 12)
 */
  
/*     productos.getProducts(); */
/* 
productos.getProductsById (); */


/*  productos.deleteProductsById(2);  */
/* productos.updateProducts ({  
    title: 'title12'
    description: 'Description12',
    price: 11520,
    img: 'Image1',
    code: 'abc123',
    stock: 5,
    id: 2
  }) */