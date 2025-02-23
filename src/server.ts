import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});
server.register(cors, {
    origin: "*"
})

const teams = [{id: 1, name: "McLaren", base: "Woking, United Kingdom"},
               {id: 2, name: "Mercedes Benz", base: "Brackley, United Kingdom"},
               {id: 3, name: "Red Bull Racing", base: "Milton keynes, United Kingdom"},
               {id: 4, name: "Ferrari", base: "Maranello, Italy"},
               {id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom"},
               {id: 6, name: "Alpine", base: "Enstone, United Kingdom"},
               {id: 7, name: "Haas", base: "Kannapolis, United States"},
               {id: 8, name: "Racing Bulls", base: "Faenza, Italy"},
               {id: 9, name: "Sauber", base: "Hinwil, Swiss"},
               {id: 10, name: "Williams", base: "Grove, United Kingdom"}
]

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);
    return {teams};
});

const drivers = [{id: 1, name: "Lando Norris", team: "McLaren"},
                 {id: 2, name: "Oscar Piastri", team: "McLaren"},                              
                 {id: 3, name: "George Russell", team: "Mercedes Benz"},                              
                 {id: 4, name: "Andrea Kimi Antonelli", team: "Mercedes Benz"},                              
                 {id: 5, name: "Max Verstappen", team: "Red Bull Racing"},                              
                 {id: 6, name: "Liam Lawson", team: "Red Bull Racing"},                              
                 {id: 7, name: "Charles Leclerc", team: "Ferrari"},                              
                 {id: 8, name: "Lewis Hamilton", team: "Ferrari"},                              
                 {id: 9, name: "Fernando Alonso", team: "Aston Martin"},                              
                 {id: 10, name: "Lance Stroll", team: "Aston Martin"},                              
                 {id: 11, name: "Pierre Gasly", team: "Alpine"},                              
                 {id: 12, name: "Jack Doohan", team: "Alpine"},                              
                 {id: 13, name: "Esteban Ocon", team: "Haas"},                              
                 {id: 14, name: "Oliver Bearman", team: "Haas"},                              
                 {id: 15, name: "Yuki Tsunoda", team: "Racing Bulls"},                              
                 {id: 16, name: "Isack Hadjar", team: "Racing Bulls"},                              
                 {id: 17, name: "Nico Hülkenberg", team: "Sauber"},                              
                 {id: 18, name: "Gabriel Bortoleto", team: "Sauber"},                              
                 {id: 19, name: "Alexander Albon", team: "Williams"},       
                 {id: 20, name: "Carlos Sainz Jr.", team: "Williams"},                       
]

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);
    return {drivers};
});

interface DriverParams{
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) =>{
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return {message: "Driver not found!"};
    }else{
        response.type("application/json").code(200);
        return driver;
    }    
})

server.listen({port: 3333}, () => {
    console.log("Server init");
});
