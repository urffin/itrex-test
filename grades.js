angular.module('grades', [])
    .component('grade', {
        bindings: {
            'info': '<'
        },
        template: `
        <div class="input-group mb-3">
            <div class="input-group-prepend"> <span class="input-group-text">Grade:</span></div>
            <input type="text" class="form-control" ng-model="$ctrl.info.title">
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">GPA</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="student in $ctrl.info.students track by $index">
                    <td>{{student.name}}</td>
                    <td>{{student.gpa}}</td>
                    <td><button type="button" class="btn btn-link" ng-click="$ctrl.removeStudent($index)"><div class="cancel"></div></button></td>
                </tr>
            </tbody>
            <tfooter>
                <tr>
                    <td><input type="text" class="form-control" ng-model="$ctrl.student.name"></td>
                    <td><input type="number" class="form-control" ng-model="$ctrl.student.gpa"></td>
                    <td><button class="btn btn-success" ng-disabled="$ctrl.student.name.length==0" ng-click="$ctrl.addStudent()">Add</button></td>
                </tr>
            </tfooter>
        </table>
        `,
        controller: [
            function () {
                this.student = { name: '', gpa: 0 };
                this.addStudent = function () {
                    this.info.students.push(this.student);
                    this.info.gpa += this.student.gpa;
                    this.student = { name: '', gpa: 0 };
                };
                this.removeStudent = function (index) {
                    this.info.students.splice(index, 1);
                };
            }
        ]
    })
    .component('grades', {
        template: `
        <h2>Gpa {{$ctrl.gpa()}}</h2>
        <ul class="nav nav-tabs mt-2">
            <li class="nav-item" ng-repeat="grade in $ctrl.grades" ng-click="$ctrl.selectedGrade=grade">
                <div ng-class="{'nav-link': true, 'active': $ctrl.selectedGrade==grade}">
                    <a>{{grade.title}}</a> <button type="button" class="btn btn-link" ng-click="$ctrl.removeGrade($index)"><div class="cancel"></div></button>
                </div>
            </li>
            <li class="nav-item ml-2 d-flex">
                <button type="button" class="btn btn-link" ng-click="$ctrl.addGrade()"><div class="plus"></div></button>
            </li>
        </ul>
        <div class="container mt-3">
            <div class="row">
                <grade class="col-12" ng-if="$ctrl.selectedGrade" info="$ctrl.selectedGrade"></grade>
            </div>
        </div>
        `,
        controller: [function () {
            this.grades = [];

            this.createGrade = function () {
                return {
                    title: 'new grade',
                    students: []
                };
            };
            this.addGrade = function () {
                var grade = this.createGrade();
                this.grades.push(grade);
                this.selectedGrade = grade;
            };
            this.removeGrade = function (index) {
                var [selected] = this.grades.splice(index, 1);
                if (selected === this.selectedGrade) {
                    this.selectedGrade = this.grades[Math.max(0, index - 1)];
                }
            };
            this.gpa = function () {
                var { gpa, studentsCount } = this.grades.reduce(({ gpa, studentsCount }, grade) => {
                    return {
                        gpa: gpa + grade.students.reduce((a, b) => a + b.gpa, 0),
                        studentsCount: studentsCount + grade.students.length
                    }
                }, { gpa: 0, studentsCount: 0 });

                return studentsCount ? gpa / studentsCount : 0;
            }
        }]
    });    