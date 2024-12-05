import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulanteService } from '../../services/postulante.service';

@Component({
  selector: 'app-revision-postulante',
  templateUrl: './revision-postulante.component.html',
  styleUrls: ['./revision-postulante.component.css']
})
export class RevisionPostulanteComponent implements OnInit {
  postulante: any;  // Para almacenar los datos del postulante

  constructor(
    private router: Router,
    private postulanteService: PostulanteService,
    private route: ActivatedRoute  // Para obtener el parámetro del ID
  ) {}

  ngOnInit(): void {
    const postulanteId = this.route.snapshot.paramMap.get('id');
    if (postulanteId) {
      this.postulanteService.getPostulanteById(postulanteId).subscribe(
        (data) => {
          this.postulante = data;
          console.log('CV URL:', this.postulante.cv);  // Verifica la URL del CV
        },
        (error) => {
          console.error('Error al obtener el postulante:', error);
        }
      );
    } else {
      console.error('ID de postulante no encontrado.');
    }
  }

  goBack(): void {
    this.router.navigate(['/vistaCvRecibido']);
  }

  // Función para manejar la descarga del CV
  downloadCv(): void {
    if (this.postulante?.cv) {
      // Crear un enlace y simular un clic para descargar el archivo
      const link = document.createElement('a');
      link.href = this.postulante.cv;  // Asegúrate de que esta URL sea correcta del backend
      link.target = '_blank';  // Para abrir en una nueva pestaña si se desea (opcional)
      link.download = 'cv-postulante.pdf';  // Nombre del archivo
      link.click();
    } else {
      console.error('No hay CV disponible para descargar');
    }
  }

  deletePostulante(): void {
    const postulanteId = this.route.snapshot.paramMap.get('id');  // Obtén el ID del postulante
    if (postulanteId) {
      // Mostrar un mensaje de confirmación antes de eliminar
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este postulante permanentemente?');
  
      if (confirmacion) {
        // Si el usuario confirma, proceder con la eliminación
        this.postulanteService.deletePostulante(postulanteId).subscribe(
          (response) => {
            console.log('Postulante eliminado:', response);
            this.router.navigate(['/cvRecibidos']);  // Redirigir al listado de postulantes
          },
          (error) => {
            console.error('Error al eliminar el postulante:', error);
          }
        );
      } else {
        console.log('Eliminación cancelada');
      }
    } else {
      console.error('ID de postulante no encontrado.');
    }
  }
}
