import Context from './common/Context';
import Insert from './actions/Insert';
import Get from './actions/Get';
// import Create from './actions/Create'
// import Update from './actions/Update'
// import Delete from './actions/Delete'
// import { map } from 'lodash-es';
import modelMethods from './methods/model';
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components, database, options) {
        Context.setup(components, database, options);
        VuexORMLoki.setupActionsMethods();
        VuexORMLoki.setupModelMethods();
    }
    /**
     * Allow everything to read the context.
     */
    getContext() {
        return Context.getInstance();
    }
    /**
     * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
     */
    static setupActionsMethods() {
        const context = Context.getInstance();
        context.components.Actions.$create = Insert.call.bind(Insert);
        context.components.Actions.$find = Get.call.bind(Get);
        // context.components.Actions.$create = Create.call.bind(Create);
        // context.components.Actions.$update = Update.call.bind(Update);
        // context.components.Actions.$delete = Delete.call.bind(Delete);
    }
    static setupModelMethods() {
        const context = Context.getInstance();
        const model = context.components.Model;
        const { $insert, $update, $delete, $find, $findOne, } = modelMethods;
        model.$insert = $insert(context);
        model.$update = $update(context);
        model.$delete = $delete(context);
        model.$find = $find(context);
        model.$findOne = $findOne(context);
    }
}