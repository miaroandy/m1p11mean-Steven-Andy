import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Service } from '../../model/Service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [NzInputModule, NzTypographyModule, FormsModule, NzButtonModule, NzGridModule, NgIf, NzSpinModule, NgxDropzoneModule, NgForOf],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})
export class FormServiceComponent {
  service: Service = new Service();
  loading = false;
  files: File[] = [];

	onSelect(event: any) {
		console.log(event);
		// Efface tous les fichiers existants et ajoute le nouveau fichier sélectionné
    this.files = [...event.addedFiles.slice(-1)];
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  constructor(private callAPI: CallAPI, private router: Router) {}

  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.service.photo = reader.result as string;
    };

    reader.onerror = (error) => {
      console.error('Erreur lors de la lecture du fichier', error);
    };

    reader.readAsDataURL(file);
  }

  onClick(): void {
    this.loading = true;

    // Vérifie s'il y a des fichiers dans la liste et prend le premier (unique) fichier
    const selectedFile = this.files.length > 0 ? this.files[0] : null;

    // Si un fichier est sélectionné, convertis-le en base64 et met à jour service.photo
    if (selectedFile) {
      this.convertFileToBase64(selectedFile);
    }

    // Envoyez le service avec la photo à votre API
    this.callAPI.saveService(this.service).subscribe(
      (data: any) => {
        this.router.navigate(['/employe/service']);
        this.loading = false;
      },
      (error: any) => {
        console.error('Erreur', error);
        this.loading = false;
      }
    );
  }

}
