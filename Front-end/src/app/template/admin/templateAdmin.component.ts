import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
    selector: 'template-admin',
    standalone: true,
    imports: [RouterOutlet, NzCardModule, NzTypographyModule, NzLayoutModule, NzPageHeaderModule, NzMenuModule, NzIconModule],
    templateUrl: './templateAdmin.component.html',
    styleUrls: ['./templateAdmin.component.css']
})
export class TemplateAdminComponent {

}
