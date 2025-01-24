'use client'

import { use, useEffect, useState } from "react"

export default function Articulo({params}){
    const {id} = use(params)
    const [articulo,setArticulo] = useState([])

    const [titulo,setTitulo] = useState("")
    const [contenido, setContenido] = useState("")
    const [autor, setAutor] = useState("")
    const [fecha_publicacion, set_fecha_publicacion] = useState("")

    async function fetchArticulo(){
        const url = "/api/articulo/articulouser?id=" +id
        const response = await fetch(url)
        const art = await response.json()
        setTitulo(art.titulo)
        setContenido(art.contenido)
        setAutor(art.autor)
        set_fecha_publicacion(art.fecha_publicacion)

        setArticulo(art)
    }

    useEffect(() => {
        fetchArticulo()
    },[])

    return(
        <div>
            <h1>{articulo.titulo}</h1>
            <h2>{articulo.contenido}</h2>
            <h3>{articulo.autor}</h3>
            <h4>{articulo.fecha_publicacion}</h4>
        </div>
    )
}