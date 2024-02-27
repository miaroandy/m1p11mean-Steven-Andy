import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Service } from '../../model/Service';
import { ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { OffreSpeciale } from '../../model/Service';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';


@Component({
    selector: 'app-fiche-service',
    standalone: true,
    imports: [NzTypographyModule, NzSpinModule, NgIf, NzCardModule, NzIconModule, NzGridModule, NgForOf, CommonModule, FormsModule, NzButtonModule, NzInputModule],
    templateUrl: './fiche-service.component.html',
    providers: []
})
export class FicheServiceComponent implements OnInit {
    loading=true;
    service:Service=new Service();
    id:string='';
    offres: OffreSpeciale[] = [];
    newOffreSpeciale: OffreSpeciale = new OffreSpeciale();

    constructor(private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id=this.route.snapshot.params['id'];
        this.callAPI.getServiceById(this.id).subscribe(result => {
            this.service = result;
            this.setOffres(this.service.offres_speciales);
            this.loading=false;
        });
    }

    setOffres(offresSpeciales: OffreSpeciale[]){
        this.offres = offresSpeciales;
    }

    addOffre(): void {
      // Envoyez le service avec la photo à votre API
      this.newOffreSpeciale.reduction /= 100;
      this.offres.push(this.newOffreSpeciale);
      this.newOffreSpeciale = new OffreSpeciale();
      this.callAPI.saveOffre(this.id, this.newOffreSpeciale).subscribe(
        (data: any) => {

        },
        (error: any) => {
          console.error('Erreur', error);
          this.loading = false;
        }
      );
    }
}
