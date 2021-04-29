
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Entry } from "../shared/entry.module";
import { EntryService } from "../shared/entry.service";

import { switchMap } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction : string = "";
  entryForm! : FormGroup; 
  pageTitle : string = "";
  serverErrorMessages : string[] = [];
  submittingForm : boolean = false;
  entry: Entry = new Entry;


  constructor(
    private toastr : ToastrService,
    private entryService : EntryService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder
  ) { 

  }

  ngOnInit() {
    this.setCurrenteAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  //Métodos privados

  setCurrenteAction(){
    if (this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new"
    }else{
      this.currentAction = "edit"
    }
  }

  buildEntryForm(){
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoriaId: [null, [Validators.required]]
    });
  }

  loadEntry(){
    if (this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(Number(params.get("id"))))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(this.entry);
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
      this.createEntry();
    }else{
      this.updateEntry();
      //this.currentAction = "edit";
    }
  }

  setPageTitle(){
    if (this.currentAction == "new"){
      this.pageTitle = "Cadastro de novo lançamento"
    }else{
      const entryName = this.entry.name || ""
      this.pageTitle = "Editando lançamento: " + entryName;
    }
  }
  
  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
  }

  private createEntry(){
    const entry: Entry = Object.assign(new Entry, this.entryForm.value);
    this.entryService.create(entry)
    .subscribe(
      (entry) => this.actionsFormSuccess(entry),
      (error) => this.actionsFormError(error)
    )
  }

  private updateEntry(){
    const entry: Entry = Object.assign(new Entry, this.entryForm.value);
    this.entryService.update(entry)
    .subscribe(
      (entry) => this.actionsFormSuccess(entry),
      (error) => this.actionsFormError(error)
    ) 
  }

  private actionsFormSuccess(entry: Entry){
    this.toastr.success("Solicitação processada com sucesso!");
    //redireciona para edição da página com o registro criado.
    //skipLocationChange : Não adicionar rota no histórico de navegação.
    this.router.navigateByUrl("entries", {skipLocationChange: true}).then(
      () => this.router.navigate(["entries", entry.id, "edit"])  
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
