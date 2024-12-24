import { AdminComponent } from "./admin.component";

import { Route, Router,Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {ProductPageComponent} from './product-page/product-page.component';
import {AddProductComponent} from './add-product/add-product.component';
import {QrScannerComponentComponent} from './qr-scanner-component/qr-scanner-component.component';
import {QrOrderComponent} from './qr-order/qr-order.component';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {RevenueComponent} from './revenue/revenue.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'ProductPage',
                component: ProductPageComponent
            },
            {
                path: 'addProduct',
                component: AddProductComponent
            },
            //sub path
            {
                path: 'edit/:productId/:skuId',
                component: AddProductComponent
            },
          {
            path: 'QRScanner',
            component: QrScannerComponentComponent
          },
          {
            path: 'qr-order',
            component: QrOrderComponent
          },
          {
            path: 'order-list',
            component: OrderlistComponent
          },
          {
            path: 'statistics',
            component: StatisticsComponent
          },
          {
            path: 'revenue',
            component: RevenueComponent
          },
            // {
            //     path: 'products/update/:id',
            //     component: UpdateProductAdminComponent
            // },
            // {
            //     path: 'products/insert',
            //     component: InsertProductAdminComponent
            // },
            // //categories
            // {
            //     path: 'categories/update/:id',
            //     component: UpdateCategoryAdminComponent
            // },
            // {
            //     path: 'categories/insert',
            //     component: InsertCategoryAdminComponent
            // },
            // {
            //     path: 'users',
            //     component: UserAdminComponent
            // },
        ]
    }
];
/*
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
*/
