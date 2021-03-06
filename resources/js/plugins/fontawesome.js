import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { } from '@fortawesome/free-regular-svg-icons'

import {
  faUser, faLock, faSignOutAlt, faCog, faUsers, faCalendarDay, faBriefcase, faUserSecret, faArrowsAltH, faEye, faEdit, faTrash, faHome, faTachometerAlt, faChevronDown, faAngleDown, faTools, faTheaterMasks, faChair, faIdCardAlt, faCircle, faSquare, faSpinner, faShoppingCart, faFileAlt, faCheckCircle, faFilePdf, faImage, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faCode, faFolder, faListUl, faListOl, faLink, faCut, faCopy, faLockOpen, faColumns, faFile
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faUser, faLock, faSignOutAlt, faCog, faGithub, faUsers, faCalendarDay, faBriefcase, faUserSecret, faArrowsAltH, faEye, faEdit, faTrash, faHome, faTachometerAlt, faChevronDown, faAngleDown, faTools, faTheaterMasks, faChair, faIdCardAlt, faCircle, faSquare, faSpinner, faShoppingCart, faFileAlt, faCheckCircle, faFilePdf, faImage, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faCode, faFolder, faListUl, faListOl, faLink, faCut, faCopy, faLockOpen, faColumns, faFile
)

// Vue.component('fa', FontAwesomeIcon)
Vue.component('font-awesome-icon', FontAwesomeIcon)
