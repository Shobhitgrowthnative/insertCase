({
    doInit: function(component, event, helper) {
        component.set("v.truthy",true);
        component.set("v.picklistdata",null);
        component.set("v.picklistVals", null);
        console.log("DoInit");
        helper.fetchPickListVal(component, event, helper);  
        helper.getMyAll(component, event, helper);
        helper.applyCSS(component, event);
        var cmpTarget = component.find('saveIt');
        $A.util.removeClass(cmpTarget, 'changeMe');
        var cmpTarget1 = component.find('updateIt');
        $A.util.addClass(cmpTarget1, 'changeMe');
        
         var err = component.find('erroralert');
        $A.util.addClass(err, 'changeMe');
        
        var update=component.find('update');
         $A.util.addClass(update, 'changeMe');
        
        var cmpTarget2 = component.find('clearIt');
        $A.util.addClass(cmpTarget2, 'changeMe');
    },
    handleClick: function(component, event, helper) {
        console.log('handle save');
        helper.saveData(component, event, helper);
        helper.getMyAll(component, event, helper);
    },
    handleUpdateClick: function(component, event, helper){
        helper.updateData(component, event, helper);
        helper.getMyAll(component, event, helper);
    },
    onObjectChange: function(component, event, helper) {
        var selectedObject = event.getSource().get("v.value");
        console.log('Selected object  :'+selectedObject);
        if(selectedObject==''){
            component.set("v.picklistdata",null);
        }
        component.set("v.selectedObject", selectedObject);
        helper.getRelatedPicklistFields(component, event, helper);
        component.set("v.picklistVals", null);
    },
    onPicklistChange: function(component, event, helper) {
        var selectedPicklist = event.getSource().get("v.value");
        console.log(' selectedPicklist  :'+selectedPicklist);
        component.set("v.selectedPicklist", selectedPicklist); 
        helper.selectedMultiPicklistVals(component, event, helper);
        helper.alreadySelected(component, event, helper);
    },
    
    onSelectChange: function(component, event, helper)
    {
        helper.onSelectChange(component, event, helper);
    },
    
    searchKeyChange: function(component, event, helper){
        helper.searchKeyChange(component, event, helper);
    },
 
    applyCSS: function(component, event, helper){
        helper.applyCSS(component, event);
    },
    
    removeCSS: function(component, event, helper){
        helper.removeCSS(component, event);
    },
    
    getClick: function(component, event, helper){
        helper.deletedata(component, event);
        helper.getMyAll(component, event, helper);
    },
    
    getEditClick: function(component, event, helper){
        component.set("v.truthy",false);
        helper.editData(component, event, helper);  
        helper.selectedMultiPicklistVals(component, event, helper);
        helper.alreadySelected(component, event, helper);
        var cmpTarget2 = component.find('clearIt');
        $A.util.removeClass(cmpTarget2, 'changeMe');
    },
    
    geterror: function(component, event, helper){
        helper.removeerror(component, event, helper);
    },
    
     getupdate: function(component, event, helper){
         console.log('remov');
        helper.removeupdate(component, event, helper);
    },
    
    //Added New type of pick
     onNext : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component, helper);
    },
    
    onPrev : function(component, event, helper) {        
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component, helper);
    },
    
    processMe : function(component, event, helper) {
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component, helper);
    },
    
    onFirst : function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.buildData(component, helper);
    },
    
    onLast : function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component, helper);
    },
    
})