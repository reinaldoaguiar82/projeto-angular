import { Categoria } from './../../categorias/shared/categoria.module';

export class Entry{
    
    constructor(
        public id?:number,
        public name?:string,
        public description?:string,
        public type?:string,
        public amount?:string,
        public date?:string,
        public paid?:boolean,
        public cateforiaId?:number,
        public categoria?: Categoria
    ){ }

    static types = {
        expense: 'Despesa',
        renevue: 'Receita'
    };

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}