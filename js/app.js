let carrito = document.getElementById('lista-carrito').querySelector('tbody')
let body = document.querySelector('body')

body.addEventListener('click', (e) => {
     const target = e.target
     if(e.target.className.includes('agregar-carrito'))
     {
          const id_producto = target.attributes['data-id'].value 
          e.preventDefault()
          
          agregarProductoACarrito(id_producto, target.parentNode.parentNode)
          localStorage.setItem('carrito', get_carrito_in_JSON())
     }
     else if(e.target.id == 'vaciar-carrito')
     {
          e.preventDefault()
          refresh_carrito([])
          localStorage.setItem('carrito', JSON.stringify([]))
     }
})

document.addEventListener('DOMContentLoaded', () => {
     let old_carrito = JSON.parse(localStorage.getItem('carrito'))
     if(old_carrito == null)
          localStorage.setItem('carrito', JSON.stringify([]))

     refresh_carrito(old_carrito)     
})


function agregarProductoACarrito(id, data)
{
     const producto = carrito.querySelector('#producto_carrito_'+ id)
     if(carrito_has_product(producto))
     {
          ++producto.lastChild.innerText
     }
     else
     {
          let info = {
               id: id,
               img_src: data.querySelector('img').src,
               name: data.querySelector('div').querySelector('h4').innerText,
               price: data.querySelector('div').querySelector('.precio').querySelector('span').innerText,
               quantity: 1
          }
          carrito.appendChild(crearTableRowCarrito(info))
     }
}

function crearTableRowCarrito(info)
{
     let row = document.createElement('tr')
     row.id = 'producto_carrito_' + info['id']

     data_img = document.createElement('td')
     img = document.createElement('img')
     img.setAttribute('src', info['img_src'])
     img.setAttribute('width', 100)
     img.setAttribute('height', 70)
     data_img.appendChild(img)

     data_name = document.createElement('td')
     data_name.appendChild(document.createTextNode(info['name']))

     data_price = document.createElement('td')
     data_price.appendChild(document.createTextNode(info['price']))

     data_quantity = document.createElement('td')
     data_quantity.appendChild(document.createTextNode(info['quantity']))

     delete_button = document.createElement('a')
     delete_button.appendChild(document.createTextNode('X'))
     delete_button.className = 'borrar-curso'

     row.appendChild(data_img)
     row.appendChild(data_name)
     row.appendChild(data_price)
     row.appendChild(data_quantity)
     row.appendChild(delete_button)
     return row
}

function carrito_has_product(producto)
{
     return producto != null
}

function get_carrito_in_JSON()
{
     let productos = []
     for(let i=0; i < carrito.childElementCount; i++)
     {
          
          let actual = carrito.childNodes[i].childNodes
          
          let temporal = {
               id: 1,
               img_src: actual[0].firstChild.src,
               name: actual[1].firstChild.nodeValue,
               price: actual[2].firstChild.nodeValue,
               quantity: actual[3].firstChild.nodeValue
          }
          productos.push(temporal)
     }

     return JSON.stringify(productos)
}

function refresh_carrito(new_carrito)
{
     while (carrito.hasChildNodes()) {
          carrito.removeChild(carrito.lastChild);
     }

     new_carrito.forEach((value) => {
          carrito.appendChild(crearTableRowCarrito(value))
     })
}
