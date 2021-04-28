
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Categoria } from "./pages/categorias/shared/categoria.module";
import { Entry } from "./pages/entries/shared/entry.module";

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categorias: Categoria[] = [
           { id : 1, name: "Lazer", description : "Pagamentos de Contas da Casa"},
           { id : 2, name: "Saúde", description : "Plano de Saúde e Remédios"},
           { id : 3, name: "Lazer", description : "Cinema, parques, praia, etc"},
           { id : 4, name: "Salário", description : "Recebimento de salário"},
           { id : 5, name: "Freelas", description : "Trabalhos extras"}
        ];

        const entries: Entry[] = [
            { id : 1, name: "Nome 01", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "70,80", type : "expense", description : "Descrição 01"} as Entry,
            { id : 1, name: "Nome 02", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "10,80", type : "expense", description : "Descrição 02"} as Entry,
            { id : 1, name: "Nome 03", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "30,70", type : "revenue", description : "Descrição 03"} as Entry,
            { id : 1, name: "Nome 04", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "30,85", type : "revenue", description : "Descrição 04"} as Entry,
            { id : 1, name: "Nome 05", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "10,00", type : "revenue", description : "Descrição 05"} as Entry,
            { id : 1, name: "Nome 06", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "74,84", type : "expense", description : "Descrição 06"} as Entry,
            { id : 1, name: "Nome 07", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "40,80", type : "expense", description : "Descrição 07"} as Entry,
            { id : 1, name: "Nome 08", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "55,40", type : "expense", description : "Descrição 08"} as Entry,
            { id : 1, name: "Nome 09", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "17,20", type : "revenue", description : "Descrição 09"} as Entry,
            { id : 1, name: "Nome 10", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "18,00", type : "expense", description : "Descrição 10"} as Entry,
            { id : 1, name: "Nome 11", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "100,89", type : "revenue", description : "Descrição 11"} as Entry,
            { id : 1, name: "Nome 12", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "18,80", type : "expense", description : "Descrição 12"} as Entry,
            { id : 1, name: "Nome 13", categoriaId : categorias[0].id, categoria : categorias[0], paid : false, date : "14/10/2020", amount : "14,13", type : "revenue", description : "Descrição 13"} as Entry,
            { id : 1, name: "Nome 14", categoriaId : categorias[0].id, categoria : categorias[0], paid : true, date : "14/10/2020", amount : "1,86", type : "expense", description : "Descrição 14"} as Entry
         ];

        return { categorias, entries };
    }
}