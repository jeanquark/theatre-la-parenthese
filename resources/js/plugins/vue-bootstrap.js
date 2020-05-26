import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ButtonPlugin, ModalPlugin, TablePlugin, BadgePlugin, CardPlugin, ProgressPlugin, FormPlugin, FormSelectPlugin, FormGroupPlugin, FormInputPlugin, SpinnerPlugin, AlertPlugin, BreadcrumbPlugin, FormCheckboxPlugin, InputGroupPlugin, PaginationPlugin, FormTextareaPlugin, FormFilePlugin, ImagePlugin, LinkPlugin, TabsPlugin, SidebarPlugin, TooltipPlugin, ToastPlugin, CarouselPlugin, CollapsePlugin, OverlayPlugin, FormRadioPlugin } from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(LayoutPlugin)
// Vue.use(ButtonPlugin)
// Vue.use(ModalPlugin)
// Vue.use(TablePlugin)
// Vue.use(BadgePlugin)
// Vue.use(CardPlugin)
// Vue.use(ProgressPlugin)
// Vue.use(FormSelectPlugin)
// Vue.use(FormGroupPlugin)
// Vue.use(FormInputPlugin)

[LayoutPlugin, ButtonPlugin, ModalPlugin, TablePlugin, BadgePlugin, CardPlugin, ProgressPlugin, FormPlugin, FormSelectPlugin, FormGroupPlugin, FormInputPlugin, SpinnerPlugin, AlertPlugin, BreadcrumbPlugin, FormCheckboxPlugin, InputGroupPlugin, PaginationPlugin, FormTextareaPlugin, FormFilePlugin, ImagePlugin, LinkPlugin, TabsPlugin, SidebarPlugin, TooltipPlugin, ToastPlugin, CarouselPlugin, CollapsePlugin, OverlayPlugin, FormRadioPlugin].forEach((x) => Vue.use(x))
