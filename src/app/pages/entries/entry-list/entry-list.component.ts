import { Entry } from './../shared/entry.module';
import { Component, OnInit } from '@angular/core';
import { EntryService } from "../shared/entry.service";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  _entries : Entry[] = [];

  constructor(
    private _entryService : EntryService
  ) { 
    
  }

  ngOnInit(): void {
    this._entryService.getAll().subscribe(
      entry => this._entries = entry,
      error => alert('Erro ao carregar a lista de depesas/receitas')
    )
  }

  deleteEntry(entry: Entry){
    const mustDelete = confirm("Deseja realmente excluir a entry?");

    if (mustDelete){
      let id :any=entry.id;
      this._entryService.delete(id).subscribe(
        () => this._entries = this._entries.filter(element => element != entry),
        () => alert("Erro ao excluir entry")
      )
    }
  }

  alert(){
    alert('excluindo');
  }

}
