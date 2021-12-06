({
    saveData : function(component, event, helper) {
        // To Save after clicking Save Button
        var text1 = component.get("v.selectedObject");
        var text2 = component.get("v.selectedPicklist");
        if(text1==undefined || text2 == undefined){
            var cmpTarget2 = component.find('erroralert');
            $A.util.removeClass(cmpTarget2, 'changeMe');
        }
        console.log('text ??> ' , text1,'<<<text2>>>: ',text2);
        if(component.get("v.selectedObject").toString()!='' && component.get("v.selectedPicklist").toString()!='' && component.get("v.selectedPicklist").toString()!='1' && component.get("v.selectedPicklistVals").toString()!='')
        {
            var action = component.get("c.saveData");   
            action.setParams({
            objectVal : component.get("v.selectedObject").toString(),
            fieldVal  : component.get("v.selectedPicklist").toString(),
            allVals : component.get("v.selectedPicklistVals").toString()
        });     
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('response getState: ' + state);
            if (state === "SUCCESS"){
                
            } else if (state == "ERROR") {
                console.log('ERROR');
            }
        });
        $A.enqueueAction(action);
        }
        else{
             var cmpTarget2 = component.find('erroralert');
            $A.util.removeClass(cmpTarget2, 'changeMe');
        }
    },
    
    updateData : function(component, event, helper) {
        // To Save after clicking Save Button
        var text1 = component.get("v.selectedObject");
        var text2 = component.get("v.selectedPicklist");
        if(text1==undefined || text2 == undefined){
            var cmpTarget2 = component.find('erroralert');
            $A.util.removeClass(cmpTarget2, 'changeMe');
        }
        if(component.get("v.selectedObject").toString()!='' && component.get("v.selectedPicklist").toString()!='' && component.get("v.selectedPicklist").toString()!='1' && component.get("v.selectedPicklistVals").toString()!='')
        {
        var action = component.get("c.updateData");   
        action.setParams({
            objectVal : component.get("v.selectedObject").toString(),
            fieldVal  : component.get("v.selectedPicklist").toString(),
            allVals : component.get("v.selectedPicklistVals").toString()
        });     
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('response getState: ' + state);
            if (state === "SUCCESS"){
                var cmpTarget2 = component.find('update');
                $A.util.removeClass(cmpTarget2, 'changeMe');
            } else if (state == "ERROR") {
                console.log('ERROR');
            }
        });
        $A.enqueueAction(action);
        }
        else{
             var cmpTarget2 = component.find('erroralert');
            $A.util.removeClass(cmpTarget2, 'changeMe');
            console.log('Eroorrr in update retet');
        }
    },
    
    editData: function(component, event, helper){
        console.log('Get Edit'); 
        var target = event.currentTarget;
        var val = target.dataset.sfid;
        var inputString = val.split('-');
        component.find("ObjectsStore").set("v.options", [{class: "optionClass",label: inputString[0],value: inputString[0]}]);
        component.set("v.optionone",inputString[0]);
        component.set("v.picklistdata",inputString[1]);
        console.log('>>>>>>>>>>>>>>>>>>>',inputString[1]);
        
        component.set("v.selectedObject",component.get("v.optionone")); 
        component.set("v.selectedPicklist", inputString[1]); 
    },
    
    
    fetchPickListVal: function(component, event, helper) {
        //It fetch all the Sobject from custom label
        var action = component.get("c.getselectOptions");
        var opts = [];
        action.setCallback(this, function(response) {
            console.log('response.getState() > ' + response.getState());
            if (response.getState() == "SUCCESS") { 
                var allValues = response.getReturnValue();
                console.log('allValues > ' , allValues);
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                console.log('opts >>>>   :',opts);
                component.find("ObjectsStore").set("v.options", opts);
            }
        });
        $A.enqueueAction(action);
    },
    getRelatedPicklistFields :  function(component, fieldName, elementId) {
        //Fetch picklist type fields of selected Sobject
        var selectedObject = component.get("v.selectedObject"); 
        var action = component.get("c.getPicklistFields");
        action.setParams({
            "sobjectValue": selectedObject
        });
        action.setCallback(this, function(response) {
            console.log('response.getState()  ' , response.getState() );
            
            if (response.getState() == "SUCCESS") {
               component.set("v.picklistdata", response.getReturnValue());                     
            }
            else if (response.getState() == "ERROR") {
            }
        });
        $A.enqueueAction(action);
    },
    selectedMultiPicklistVals : function(component, event, helper) {
        //Fetch picklist type field values which have been specified before
        var selectedObject = component.get("v.selectedObject"); 
        var selectedPicklist = component.get("v.selectedPicklist"); 
        if(selectedPicklist!='1'){
            var action = component.get("c.picklistValues");
            action.setParams({
                object_name : selectedObject,
                field_name  : selectedPicklist,
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state > ' , state);
                if (state === "SUCCESS"){
                    var result = response.getReturnValue();
                    console.log('result >> :',result[0]);
                    var plValues = [];
                    for (var i = 0; i < result.length; i++) {
                        plValues.push({
                            label: result[i],
                            value: result[i]
                        });
                    }
                    component.set("v.picklistVals", plValues); 
                }
            }); 
        }
        else{
            component.set("v.picklistVals", '');
        }
        
        $A.enqueueAction(action);
    },
    
    alreadySelected: function(component, event, helper){
        var selectedObject = component.get("v.selectedObject"); 
        var selectedPicklist = component.get("v.selectedPicklist"); 
        var action = component.get("c.getAlreadySelected");
        
        action.setParams({
            object_name : selectedObject,
            field_name  : selectedPicklist,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state > in already selected: ' , state);
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                var st=result.toString();
                var stu=st.split(',');
                console.log('ststststs  >>t:',stu);
                component.set("v.selectedPicklistVals", stu);
                if(stu!='')
                {
                    var cmpTarget = component.find('saveIt');
                    $A.util.addClass(cmpTarget, 'changeMe');
                    var cmpTarget = component.find('updateIt');
                    $A.util.removeClass(cmpTarget, 'changeMe');
                    console.log("is not null");
                }
                else if(stu=='')
                {
                    var cmpTarget = component.find('saveIt');
                    $A.util.removeClass(cmpTarget, 'changeMe');
                    var cmpTarget = component.find('updateIt');
                    $A.util.addClass(cmpTarget, 'changeMe');
                    console.log('Is empty!!');
                }
            }
        }); 
        $A.enqueueAction(action);
    },
    
    getMyAll : function(component, event, helper){
        //It shows all the data inside custom setting, which are saved from above options
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.getAllValues");
        
        action.setCallback(this, function(response){   
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS")  
            {
                component.set('v.allDatas', response.getReturnValue());
                component.set('v.totalSize', component.get('v.allDatas').length);
                
                component.set('v.start',0);
                component.set('v.end',pageSize-1);
                
                var paginationList = [];
                
                for(var i=0; i< pageSize; i++)   
                {
                    paginationList.push(response.getReturnValue()[i]);
                }                
                component.set('v.myalltasks', paginationList);  
                
                
                
                
                component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                component.set("v.allData", response.getReturnValue());
                component.set("v.currentPageNumber",1);
                helper.buildData(component, helper);
            }
        });
        var requestInitiatedTime = new Date().getTime();
        $A.enqueueAction(action);
    },
    
    onSelectChange : function(component, event, helper) {
        // It specifies, how many data you want to see at once
        var selected = component.find("records").get("v.value");
        console.log('selected  :',selected)
        var paginationList = [];
        var oppList = component.get('v.allDatas');
        for(var i=0; i< selected; i++)   
        {
            paginationList.push(oppList[i]);
        }
        component.set('v.myalltasks', paginationList);
    },
    
    searchKeyChange: function(component, event) {
        //It helps to search the data from data name
        var searchKey =  component.find("input1").get("v.value");
        var action = component.get("c.getByName");
        var keysize = component.get("v.pageSize");
        console.log('search',searchKey);
        action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){  
                component.set('v.allDatas', response.getReturnValue());
                component.set('v.totalSize', component.get('v.allDatas').length);
                var paginationList = [];
                for(var i=0; i< keysize; i++){
                    paginationList.push(response.getReturnValue()[i]);
                }
                component.set('v.myalltasks', paginationList);
            } 
        });
        $A.enqueueAction(action);
    },
    
    applyCSS: function(component, event) {
        var cmpTarget = component.find('changeIt');
        $A.util.addClass(cmpTarget, 'changeMe');
        var cmpTarget = component.find('changeItUp');
        $A.util.removeClass(cmpTarget, 'changeMe');
        
        var cmpTarget2 = component.find('error');
        $A.util.addClass(cmpTarget2, 'changeMe');
    },
    removeCSS: function(cmp, event) {
        var cmpTarget = cmp.find('changeItUp');
        $A.util.addClass(cmpTarget, 'changeMe');
        var cmpTarget = cmp.find('changeIt');
        $A.util.removeClass(cmpTarget, 'changeMe');
    },
    deletedata: function(component, event, helper){
        var target = event.currentTarget;
        var val = target.dataset.sfid;
        console.log("clicked bro..",val);
        
        var action = component.get('c.deleteTrackingAnalytics');   
        action.setParams({
            name : val,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('response getState: ' + state);
            if (state === "SUCCESS"){
                console.log("Success!...");
            } else if (state == "ERROR") {
                console.log('ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    
    removeerror: function(component,event, helper){
        var err = component.find('erroralert');
        $A.util.addClass(err, 'changeMe');
        console.log('error removes'); 
    },
	
	removeupdate: function(component,event, helper){
        var err = component.find('update');
        $A.util.addClass(err, 'changeMe');
        console.log('update removes'); 
    },
    
     buildData : function(component, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.allData");
        var x = (pageNumber-1)*pageSize;
        
        //creating data-table data
        for(; x<=(pageNumber)*pageSize; x++){
            if(allData[x]){
            	data.push(allData[x]);
            }
        }
        component.set("v.myalltasks", data);
        
        helper.generatePageList(component, pageNumber);
    },
    
    /*
     * this function generate page list
     * */
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
    },
    
})