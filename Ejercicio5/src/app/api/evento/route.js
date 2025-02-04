
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyaraedkwjgspknimmfb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){

const{data: contacts, error} = await supabase
.from('evento')
.select('id,titulo')
.order("fecha",{ascending: true})

    return new Response(JSON.stringify(contacts), {status:200})
}

export async function POST(request){
    const body = await request.json()
    const evento = body.evento
    const {data: postData, error} = await supabase.from("evento")
    .insert(evento)

    if(!error){
        return new Response(JSON.stringify({success: "Creado con éxito"}), {status:201})
    }

    return new Response(JSON.stringify(error) , {status:400})
    
}

export async function DELETE(request){
    const body = await request.json()
    const id = body.id

    const {data: deleteData, error} = await supabase.from("evento")
    .delete()
    .eq("id", id)

    if(error){
        return new Response(JSON.stringify(error), {status:404})
    }

    return new Response(JSON.stringify({success: "eliminado con éxito"}), {status:200})
}
