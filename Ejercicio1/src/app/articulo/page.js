'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ListArticulos(){
    
    const [articulos,setArticulos] = useState([])

    async function fetchArticulos(){
        const response = await fetch("/api/articulo")
        const body = await response.json()
        setArticulos(body)
    }

    useEffect(() => {
        fetchArticulos()
    },[])

    async function deleteArticulo(deleteArticulo){
        if(window.confirm("¿Seguro que quieres eliminarlo?")){
            const response = await fetch("/api/articulo", {
                method: 'DELETE',
                headers: {"Content-Type": "application-json"},
                body: JSON.stringify({id: deleteArticulo})
            })

            fetchArticulos();
        }
    }


    
    return(
        <div>
            <h1>Lista de articulos</h1>
            {articulos.map(articulo => 
                <p key={articulo.id}>
                    <Link href={"/articulo/" + articulo.id} >Titulo: {articulo.titulo} | Autor: {articulo.autor} | Fecha de publicación: {articulo.fecha_publicacion} </Link>
                    <button onClick={() => deleteArticulo(articulo.id)}>Eliminar</button>
                </p>

            )}
            <br/>
            <Link href={"/articulo/create"}> Añadir artículo</Link>

        </div>     
    
    )
}