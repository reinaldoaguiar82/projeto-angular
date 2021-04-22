
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Categoria } from "./pages/categorias/shared/categoria.module";

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categorias: Categoria[] = [
           { id : 1, name: "Lazer", description : "Pagamentos de Contas da Casa"},
           { id : 2, name: "Saúde", description : "Plano de Saúde e Remédios"},
           { id : 3, name: "Lazer", description : "Cinema, parques, praia, etc"},
           { id : 4, name: "Salário", description : "Recebimento de salário"},
           { id : 5, name: "Freelas", description : "Trabalhos extras"}
        ];
        return { categorias };
    }
}