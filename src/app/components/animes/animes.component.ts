import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Anime } from 'src/app/model/Anime';
import { AnimesService } from 'src/app/services/animes.service';
/**
 * Componente para la pantalla de animes.
 */
@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  /**
   * Listado de animes.
   */
  animes: Anime[] = [];
  /**
   * Objeto anime a guardar o eliminar.
   */
  anime: Anime = new Anime();
  /**
   * Pagina inicial
   */
  page = 1;
  /**
   * Total de páginas a mostrar en el paginador.
   */
  pageSize = 4;
  /**
   * Cantidad de registros.
   */
  collectionSize = 0;
  /**
   * Objeto que permite cerrar o abrir dinamicamente la ventana modal.
   */
  modalReference: NgbModalRef;
  /**
   * Constructor que permite inicializar el componente de animes.
   */
  constructor(private animesService: AnimesService, 
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) { }
  /**
   * Metodo que permite inicializar la informacion de la pantalla de animes.
   */
  ngOnInit(): void {
    this.spinner.show();

    this.consultar();
  }
  /**
   * Metodo que permite consultar el listado de animes.
   */
  consultar() {
    this.animesService.consultarAnimes().subscribe(response => {

      this.spinner.hide();

      this.animes = response
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    });
  }
  /**
   * Metodo que permite guardar o actualizar registros de anime.
   */
  guardar(data: any) {
    this.spinner.show();
    if(!data.nombre) {
      console.log('El nombre es requerido');
      this.spinner.hide();
      return;
    }

    if(!data.genero) {
      console.log('El genero es requerido');
      this.spinner.hide();
      return;
    }

    //Si el id vienen en la entidad entonces se actualiza el registro.
    if (this.anime.id != undefined) {
      this.animesService.actualizarAnime(this.anime).subscribe(response => {
        this.spinner.hide();
        this.modalReference.close();
        this.mostrarMensaje('Exitoso', 
                            `El anime ${data.nombre} ha sido actualizado exitósamente`, 
                            'success');
        this.consultar();
        this.inicializarComponentes();

      }, error => {
        console.log(error);
      });
    } else {
      this.animesService.guardarAnime(this.anime).subscribe(response => {
        this.spinner.hide();
        this.modalReference.close();
        this.mostrarMensaje('Exitoso', 
                            `El anime ${data.nombre} ha sido guardado exitósamente`, 
                            'success');
        this.consultar();
        this.inicializarComponentes();
      }, error => {
        console.log(error);
      });
    }
  }
  /**
   * Metodo que permite eliminar un anime.
   * @param id identificador del anime.
   */
  eliminar(id: number) {
    this.spinner.show();
    this.animesService.eliminarAnime(id).subscribe(response => {
      this.spinner.hide();
      this.mostrarMensaje('Exitoso', `El anime ha sido eliminado exitósamente`, 'success');
      this.consultar();
    });
  }

  /**
   * Metodo que permite cargar el anime a actualizar.
   * @param anime 
   * @param content 
   */
  cargarAnime(anime: Anime, content: any) {
    this.anime.id = anime.id;
    this.anime.nombre = anime.nombre;
    this.anime.genero = anime.genero;
    this.anime.fechaCreacion = anime.fechaCreacion;
    this.open(content);
  }
  /**
   * Metodo que permite mostrar la ventana de confirmacion para eliminar un anime.
   * @param anime 
   */
  mostrarVentanaEliminar(anime: Anime) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `El anime ${anime.nombre} será eliminado `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if(result.isConfirmed) {
        this.eliminar(anime.id);
      }
    });
  }

  /**
   * Metodo que permite mostrar un mensaje generico.
   * @param titulo titulo de la ventana.
   * @param mensaje mensaje a mostrar al usuario.
   * @param tipo tipo de mensaje a mostrar (success, info, warning, error, question)
   */
  mostrarMensaje(titulo: string, mensaje: string, tipo: SweetAlertIcon) {
    Swal.fire(titulo, mensaje, tipo);
  }
  /**
   * Metodo que permite inicializar los componentes.
   */
  inicializarComponentes() {
    this.anime = new Anime();
  }
  /**
   * Metodo que permite abrir una ventana modal.
   * @param content 
   */
  open(content: any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      
    }, (reason) => {

    });
  }
}
