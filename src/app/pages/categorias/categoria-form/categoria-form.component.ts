
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Categoria } from "../shared/categoria.module";
import { CategoriaService } from "../shared/categoria.service";

import { switchMap } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  currentAction : string = "";
  categoriaForm! : FormGroup; 
  pageTitle : string = "";
  serverErrorMessages : string[] = [];
  submittingForm : boolean = false;
  categoria: Categoria = new Categoria;


  constructor(
    private toastr : ToastrService,
    private categoriaService : CategoriaService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder
  ) { 

  }

  ngOnInit() {
    this.setCurrenteAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  //Métodos privados

  setCurrenteAction(){
    if (this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new"
    }else{
      this.currentAction = "edit"
    }
  }

  buildCategoriaForm(){
    this.categoriaForm = this.formBuilder.group({
                            id: [null],
                            name: [null, [Validators.required, Validators.minLength(5)]],
                            description: [null]
                          });
  }

  loadCategoria(){
    if (this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(Number(params.get("id"))))
      ).subscribe(
        (categoria) => {
          this.categoria = categoria;
          this.categoriaForm.patchValue(this.categoria);
        },
        (error) => alert('Ocorreu um erro no servidor')
      )
    }
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }  

  submitForm(){
    this.submittingForm = true;
    if (this.currentAction == "new"){
      this.createCategoria();
    }else{
      this.updateCategoria();
      //this.currentAction = "edit";
    }
  }

  setPageTitle(){
    if (this.currentAction == "new"){
      this.pageTitle = "Cadastro de nova categoria"
    }else{
      const categoriaName = this.categoria.name || ""
      this.pageTitle = "Editando categoria: " + categoriaName;
    }
  }
  
  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
  }

  private createCategoria(){
    const categoria: Categoria = Object.assign(new Categoria, this.categoriaForm.value);
    this.categoriaService.create(categoria)
    .subscribe(
      (categoria) => this.actionsFormSuccess(categoria),
      (error) => this.actionsFormError(error)
    )
  }

  private updateCategoria(){
    const categoria: Categoria = Object.assign(new Categoria, this.categoriaForm.value);
    this.categoriaService.update(categoria)
    .subscribe(
      (categoria) => this.actionsFormSuccess(categoria),
      (error) => this.actionsFormError(error)
    ) 
  }

  private actionsFormSuccess(categoria: Categoria){
    this.toastr.success("Solicitação processada com sucesso!");
    //redireciona para edição da página com o registro criado.
    //skipLocationChange : Não adicionar rota no histórico de navegação.
    this.router.navigateByUrl("categorias", {skipLocationChange: true}).then(
      () => this.router.navigate(["categorias", categoria.id, "edit"])  
    )

  }

  private actionsFormError(error: any){
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;
    if (error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"];
    }
  }

}
