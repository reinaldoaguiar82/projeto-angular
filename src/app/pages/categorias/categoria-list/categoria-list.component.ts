import { Categoria } from './../shared/categoria.module';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../shared/categoria.service";

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  _categorias : Categoria[] = [];

  constructor(
    private _categoriaService : CategoriaService
  ) { 
    console.log('teste');
  }

  ngOnInit(): void {
    this._categoriaService.getAll().subscribe(
      categorias => this._categorias = categorias,
      error => alert('Erro ao carregar a lista de categorias')
    )
  }

  deleteCategoria(categoria: Categoria){
    const mustDelete = confirm("Deseja realmente excluir a categoria?");

    if (mustDelete){
      let id :any=categoria.id;
      this._categoriaService.delete(id).subscribe(
        () => this._categorias = this._categorias.filter(element => element != categoria),
        () => alert("Erro ao excluir categoria")
      )
    }
  }

  alert(){
    alert('excluindo');
  }

}
