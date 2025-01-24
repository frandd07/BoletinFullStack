'use client'

import { useState } from "react"

export default function CrearArticulo(){
    const [titulo,setTitulo] = useState("")
    const [contenido,setContenido] = useState("")
    const [autor,setAutor] = useState("")

    async function crearArticulo(e){
        e.preventDefault();

        if(titulo !== "" && contenido !== "" && autor !== ""){
            const response = await fetch("/api/articulo", {
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    articulo: {
                        titulo: titulo,
                        contenido: contenido,
                        autor: autor,
                    }
                })
            })
    
            if (response.ok) {
                alert("Artículo creado exitosamente.");
                setTitulo("");
                setContenido("");
                setAutor("");
              } else {
                alert("Hubo un error al crear el artículo");
              }
        }else{
            alert("Error al crear el artículo")
        }

       
    }

    return(
        <div>
            <h1>Añadir articulo</h1>
            <form onSubmit={crearArticulo}>
                <label>
                    Titulo:
                    <input 
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    maxLength={150}
                    required
                    />
                </label>
                <br/>
                <label>
                    Contenido:
                    <input 
                    type="text"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                    />
                </label>
                <br/>
                <label>
                    Autor:
                    <input 
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                    />
                </label>
                <br/>
                <input type="submit" value="Crear artículo"/>
            </form>
        </div>
    )
}