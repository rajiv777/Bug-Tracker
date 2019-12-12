$(document).ready(function () {
    var dirtyCheck = false;
    var status = '';
    var clickOnEdit = false;
    var itemsArr = '{"bugs":[{"id":"1001","name":"Issue 1","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Rajiv Puranwar","status":"New","severity":"High"},{"id":"1002","name":"Issue 2","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Komal Puranwar","status":"Open","severity":"Low"},{"id":"1003","name":"Issue 3","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Vishal Puranwar","status":"Resolved","severity":"Medium"},{"id":"1004","name":"Issue 4","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Valli","status":"New","severity":"High"},{"id":"1005","name":"Issue 5","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Shruti","status":"New","severity":"High"},{"id":"1006","name":"Issue 6","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Swetha","status":"New","severity":"Medium"},{"id":"1007","name":"Issue 7","description":"Issue-1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation","assignedTo":"Rajani","status":"New","severity":"Low"}]}'
    var items = JSON.parse(itemsArr);
    var currentBugID = "100" + items.bugs.length;
    localStorage.setItem('dataObject', JSON.stringify(items));
    printData(items);

    $("#main").on("click", ".edit-btn", function () {
        clickOnEdit = true;
        $('.add-btn').addClass('hide');
        $('.add-form').removeClass('hide');
        $('.title-form-edit').removeClass('hide');
        $('.title-form').addClass('hide');
        $('#main').addClass('hide');
        $('label').addClass('active');
        $('select').formSelect();
        var id = event.target.id;
        setValues(id);
    });

    $("#main").on("click", ".delete-btn", function () {
        var deleteID = event.target.id;
        deleteValues(deleteID);
    });

    $('.add-btn').on('click', function () {
        $('.add-btn').addClass('hide');
        $("form")[0].reset();
        $('.add-form').removeClass('hide');
        $('#main').addClass('hide');
        $('.title-form').removeClass('hide');
        $('.title-form-edit').addClass('hide');
    });

    $('.close-btn').on('click', function () {
        $('.add-btn').removeClass('hide');
        $('#main').removeClass('hide');
        $('.add-form').addClass('hide');
    });

    $('.submit-btn').on('click', function () {
        validateForm();
    });

    $("#search-box").keyup(function () {
        searchByName();
    });

    $('.all-resolved, .all-open').on('click', function () {
        filterResolved();
    });

    function validateForm() {
        if ($('#bug_name').val() == '') {
            return false;
        }
        if ($('#severity').val() == '') {
            return false;
        }
        if ($('#bug_desc').val() == '') {
            return false;
        }
        if ($('#assigned').val() == '') {
            status = "New";
        } else {
            status = $('#status').val();
        }
        if (!clickOnEdit) {
            currentBugID++;
        }
        dirtyCheck = true;
        getData();
        $('.close-btn').click();
        $("form")[0].reset();
    }

    function printData(items) {
        clickOnEdit = false;
        if (dirtyCheck) {
            $('.card').remove();
        }
        for (var i in items.bugs) {
            var htmlElement = $('#main');
            var html = '';
            var edit = "Edit";
            var remove = "Delete";
            html += '<div class="card" id="">';
            html += '<div class="card-content">';
            html += '<div><h4 class="bug-name">' + items.bugs[i].name + '</h4></div>';
            html += '<div class="col-md-12 col-xs-12 no-padding bug-label">';
            html += '<div class="col-md-4 col-xs-4 no-padding"><div class="label-text">Bug ID </div>';
            html += '<span class="bug-id">' + items.bugs[i].id + '</span></div>';
            html += '<div class="col-md-4 col-xs-4 no-padding"><div class="label-text">Status </div>';
            html += '<strong class="status">' + items.bugs[i].status + '</strong></div>';
            html += '<div class="col-md-4 col-xs-4 no-padding"><div class="label-text">Severity </div>';
            html += '<span class="severity">' + items.bugs[i].severity + '</span></div></div>';
            html += '<div class="col-md-12 col-xs-12 no-padding bug-label"><div class="label-text">Description  </div>';
            html += '<p class="desc">' + items.bugs[i].description + '</p></div>';
            html += '<div><span class="label-text">Assigned To : </span>';
            html += '<strong class="assigned-to">' + items.bugs[i].assignedTo + '</strong></div>';
            html += '</div>';
            html += '<div class="card-action text-right">';
            html += '<a class="edit-btn" id=\'edit' + i + '\'>' + edit + '</a>';
            html += '<a class="delete-btn" id=\'delete' + i + '\'>' + remove + '</a>';
            html += '</div>';
            html += '</div>';
            htmlElement.append(html);
        }
    }

    function getData() {
        var bug_name = $('#bug_name').val();
        var assigned_to = $('#assigned').val();
        var desc = $('#bug_desc').val();
        var priority = $('#severity').val();
        var obj = JSON.parse(localStorage.getItem("dataObject"));
        var changedObj = {
            "id": currentBugID.toString(),
            "name": bug_name,
            "status": status,
            "description": desc,
            "assignedTo": assigned_to,
            "severity": priority
        };

        if (clickOnEdit) {
            editData(obj, bug_name, changedObj);
        } else {
            if (obj.bugs) { // print after edit
                obj['bugs'].push({
                    "id": currentBugID.toString(),
                    "name": bug_name,
                    "status": status,
                    "description": desc,
                    "assignedTo": assigned_to,
                    "severity": priority
                });
                localStorage.setItem('dataObject', JSON.stringify(obj));
                printData(obj);
            } else { //direct print
                var parseObj = JSON.parse(obj);
                parseObj['bugs'].push({
                    "id": currentBugID.toString(),
                    "name": bug_name,
                    "status": status,
                    "description": desc,
                    "assignedTo": assigned_to,
                    "severity": priority
                });
                localStorage.setItem('dataObject', JSON.stringify(parseObj));
                printData(parseObj);
            }
        }
    }

    function setValues(id) {
        var html = event.target.parentElement.parentElement;
        var name = $(html).find(".bug-name").text();
        var assigned = $(html).find(".assigned-to").text();
        var priority = $(html).find(".severity").text();
        var desc = $(html).find(".desc").text();
        var status = $(html).find(".status").text();
        $('#bug_name').val(name);
        $('#assigned').val(assigned);
        $('#severity').val(priority);
        $('#bug_desc').val(desc);
        $('#status').val(status);
    }

    function deleteValues(id) {
        swal({
            title: "This record is deleted!",
            icon: "success",
            button: "OK",
          });
        event.target.parentElement.parentNode.remove();
    }

    function editData(oldObject, bug_name, changedObj) {
        var array = oldObject.bugs;
        var ind = 0;
        var found;
        var entry;
        for (ind = 0; ind < array.length; ++ind) {
            entry = array[ind];
            if (entry.name == bug_name) {
                found = entry;
                break;
            }
        }
        array.splice(ind, 1, changedObj);
        var newArr = '{"bugs":' + JSON.stringify(array) + '}';
        localStorage.setItem('dataObject', newArr);
        printData(JSON.parse(newArr));
    }

    function searchByName() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('search-box');
        filter = input.value.toUpperCase();
        ul = document.getElementById("main");
        li = ul.getElementsByClassName('card');

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("bug-name")[0];
            b = li[i].getElementsByClassName("assigned-to")[0];
            bugName = a.textContent || a.innerText;
            assignee = b.textContent || b.innerText;
            if (bugName.toUpperCase().indexOf(filter) > -1 || assignee.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                $('.no-result').addClass('hide');
            } else {
                li[i].style.display = "none";
                $('.no-result').removeClass('hide');
            }
        }
    }

    function filterResolved() {
        var obj = JSON.parse(localStorage.getItem("dataObject"));
        var arrToFilter = obj.bugs;
        var filtered;
        if (event.toElement.name === "all-resolved") {
            filtered = arrToFilter.filter(function (item) {
                return item.status == "Resolved";
            });
        } else {
            filtered = arrToFilter.filter(function (item) {
                return item.status == "Open";
            });
        }
        dirtyCheck = true;
        var newArr = '{"bugs":' + JSON.stringify(filtered) + '}';
        printData(JSON.parse(newArr));
    }

});