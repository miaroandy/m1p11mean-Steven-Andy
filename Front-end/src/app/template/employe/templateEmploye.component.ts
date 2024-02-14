import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
    selector: 'template-employe',
    standalone: true,
    imports: [RouterOutlet, NzCardModule, NzTypographyModule, NzLayoutModule, NzPageHeaderModule,  NzMenuModule, NzIconModule],
    templateUrl: './templateEmploye.component.html',
    styleUrls: ['./templateEmploye.component.css']
})
export class TemplateEmployeComponent {

}
