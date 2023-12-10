import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector       : 'aspnetusers-page',
    templateUrl    : './apsnetusers.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [RouterOutlet],
})
export class AspnetUsersComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
