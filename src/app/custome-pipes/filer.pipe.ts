import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilerPipe implements PipeTransform {

    transform(items: any[], searchTerm: any): any {
        if (!items || !searchTerm) return items;
            
        if (isNaN(searchTerm)) {        // si son letras es por que intenta buscar por el nombre
            return items.filter(item => item.producto.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        } else {    //si no se asume que es un número, (debería cambiarlo XD)
            return items.filter(item => item.id_producto.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        }
    }

}
