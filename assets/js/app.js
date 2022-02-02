$(() => {
    //console.log("Dom listo")
    const formulario = $("#formulario")
    const inputI = $("#inputI")
    const personaje = $("#personaje")
    const containergrafico = $("#containergrafico")
    const alerta = $("#alerta")
    const alerta1 = $("#alerta1")

    formulario.on("submit", (e) => {
        e.preventDefault()

        //validacion
        console.log(inputI.val())
        const num = /^\d+$/
        console.log(num.test(inputI.val()))
        if (!num.test(inputI.val())) {
            alerta.removeClass("d-none")
            alerta1.addClass("d-none")
            containergrafico.html("")
            personaje.html("")

            return console.log("no es numero")
        } else {
            alerta1.removeClass("d-none")

        }

        //limpieza
        personaje.html("")
        containergrafico.html("")
        alerta.addClass("d-none")
        alerta1.removeClass("d-none")


        $.ajax({
            url: `https://www.superheroapi.com/api.php/3525635500807579/${inputI.val()}`,
            type: "GET",
            dataType: "JSON",
            success(data) {
                console.log(data)
                personaje.append(`
                <section class="card mb-3">
                <div class="row g-0">
                 <div class="col-md-4">
                    <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
                 </div>
                 <div class="col-md-8">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Nombre: ${data.name}</li>
                            <li class="list-group-item">Conexiones: ${data.connections["group-affiliation"]}</li>
                            <li class="list-group-item">Publicado: ${data.biography.publisher}</li>
                            <li class="list-group-item">Ocupación: ${data.work.occupation}</li>
                            <li class="list-group-item">Primera aparición: ${data.biography["first-appearance"]}</li>
                            <li class="list-group-item">Altura: ${data.appearance.height}</li>
                            <li class="list-group-item">Peso: ${data.appearance.weight}</li>
                            <li class="list-group-item">Alianzas: ${data.biography.aliases}</li>
                        </ul>
                    </div>
                  </div>
                 </div>
                </section>
                `)

                //const dataPoints =
                const opciones = {
                    AnimationEnabled: true,
                    title: {
                        text: `Estadisticas de poder para ${data.name}`
                    },
                    zoomEnabled: true,
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        legendText: "{indexLabel}",
                        dataPoints: [
                            { y: data.powerstats.intelligence !== "null" ? data.powerstats.intelligence : 0, indexLabel: "intelligence", },
                            { y: data.powerstats.strength !== "null" ? data.powerstats.strength : 0, indexLabel: "strength", },
                            { y: data.powerstats.speed !== "null" ? data.powerstats.speed : 0, indexLabel: "speed", },
                            { y: data.powerstats.durability !== "null" ? data.powerstats.durability : 0, indexLabel: "durability" },
                            { y: data.powerstats.power !== "null" ? data.powerstats.power : 0, indexLabel: "power", },
                            { y: data.powerstats.combat !== "null" ? data.powerstats.combat : 0, indexLabel: "combat" },

                        ]
                    }]
                }
                containergrafico.CanvasJSChart(opciones)

            },
            error(e) {
                console.log(e)
            }
        })
    })
})