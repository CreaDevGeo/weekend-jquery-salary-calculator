/* **** WEEKEND CHALLENGE 👊: jQuery Salary Calculator ****

🎯 Create an application that records employee salaries and adds salaries up to report monthly costs.

Topics Covered
- JavaScript
- jQuery - Selectors, append, and event handling

| Assignment |

✨ The application should have an input form that collects employee first name, last name, ID number, job title, annual salary.
✨ A 'Submit' button should collect the form information, store the information to calculate monthly costs, append information to the DOM and clear the input fields. Using the stored information, calculate monthly costs and append this to the to DOM. If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
✨ Create a delete button that removes an employee from the DOM. For Base mode, it does not need to remove that Employee's salary from the reported total.

- Files Provided -
No files have been provided (just instructions.md and a readme.md). Instead of forking and cloning this repo, please choose "Use This Template" (green button) and name your new repo "weekend-jquery-salary-calculator" and clone down from there. Make sure to commit regularily!

- Wireframe -
HTML Table: https://www.w3schools.c om/html/html_tables.asp

- 😓 Stretch Mode -
✨Add styling or extra functionality that fits with the theme of this assignment.
✨Once the employee is deleted, update the Total Monthly Cost section on the page to reflect the employee's removal. HINT: You will need to figure out which employee was removed, in order to subtract their salary from the total. Consider using .text() as a getter, or look into jQuery's .data() function. This is tricky!

- Reminder About Modes -
Above, we introduced the concept of levels of difficulty. "Mode" is how we will typically refer to each level. Below is a brief explanation of

what to expect when attempting each mode
if they are required or not
Mode	Description
Base	required
Stretch	optional, stretches your understanding and may require additional research

- Assignment Submission -
Check in your repo, then turn in your work via the Prime Academy Assignment Application at http://primeacademy.io, as usual and don't hesitate to hit up the Slack channel as needed!
*/

/* | Tasks |

- Base Mode -
✅  - Create an input form that collects employee first name, last name, ID number, job title, annual salary.
✅  - Make a 'Submit' button that collects the form information, stores the information to calculate monthly costs, appends information to the DOM and clears the input fields. 
✅  - Using the stored information, calculate monthly costs and append this to the to DOM. If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
✅  - Create a delete button that removes an employee from the DOM. 
✅      - For Base mode, it does not need to remove that Employee's salary from the reported total.

- Stretch Mode -
✅  - Add styling or extra functionality that fits with the theme of this assignment.
    - Once the employee is deleted, update the Total Monthly Cost section on the page to reflect the employee's removal. HINT: You will need to figure out which employee was removed, in order to subtract their salary from the total. Consider using .text() as a getter, or look into jQuery's .data() function. This is tricky!

*/

// Global array for employees tto be stored
let employees = [];

// When DOM ready run readyNow
$(document).ready(readyNow);

/* - Functions -
 Function that on DOM load, runs other functions */
function readyNow() {

    // Event listener for submit button: On click of submit button, run storeEmployeeData
    $('#submit-button').on('click', storeEmployeeData);

    // Delete Button
    // Event listener: On click of delete button that was appended, run deleteButton
    // Event delegation for delete button that was created
    $('#employee-table').on('click', '#delete-button', deleteButton);
} // end readyNow

// Function to: store employee info inputs, append inputs to table on DOM, create a delete header on table and button, clear input field, run function monthlyCostCalculator
function storeEmployeeData(event) {
    console.log('Storing employee data...');

    // 1. On event:
    // Cancel reloading of DOM
    event.preventDefault()

    // - Variables -
    // 2. Store form input field values
    let firstName = $('#employee-first-name').val();
    let lastName = $('#employee-last-name').val();
    let idNumber = $('#employee-id-number').val();
    let jobTitle = $('#employee-job-title').val();
    let annualSalary = $('#employee-annual-salary').val();

    // Adding form input value variables to global variable
    employees.push({
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        jobTitle: jobTitle,
        annualSalary: Number(annualSalary)
    });
    // - End Variables -

    /* Conditionals: 
        - For for annual salary or ID number input that is not an integer
            - Using new syntax that I learned about to check if annualSalary is a valid number. Using isNaN method */
    if (isNaN(idNumber)) {
        // The input value isn't an integer, don't add to table or store info
        // Adding text to DOM in fieldset element
        $('#non-valid-input').text("Invalid input. Please enter a valid number for ID number.");

        // Clear input field
        $('#employee-id-number').val('');

        // Log to console
        console.log("Invalid input. Please enter a valid ID number.");
        return; // Exit the function if the value is not a valid number
    }
    else if (isNaN(annualSalary)) {
        // The input value isn't an integer, don't add to table or store info
        // Adding text to DOM in fieldset element
        $('#non-valid-input').text("Invalid input. Please enter a valid number for salary.");
        
        // Clear input field
        $('#employee-annual-salary').val('');

        // Log to console
        console.log("Invalid input. Please enter a valid salary number.");
        return; // Exit the function if the value is not a valid number
    } // end not a valid number


    /* For Empty input fields, dont add data and row to table
        - Using some new syntax that I learned about to require input from users.
            - 'required' attribute in HTML form won't work due to button function override so must add this conditional */
    if (!$('form')[0].checkValidity()) {
        // The form isn't complete, don't add to table or store info
        // Adding text to DOM in fieldset element
        $('#non-valid-input').text("Employee data not stored. Please make sure all input fields are completed.");

        // Log to console
        console.log("Employee data not stored. All input fields must be complete.");
        return; // exit the function if not valid
    } // end don't add conditional
    // Else run entire rest of function
    else {
        // Removing the non-valid prompt
        $('#non-valid-input').text("");

        // Logging
        console.log('Added to table.');
        console.log('Employee first name:', firstName);
        console.log('Employee last name:', lastName);
        console.log('Employee id number:', Number(idNumber));
        console.log('Employee job title:', jobTitle);
        console.log('Employee annual salary:', Number(annualSalary));
        console.log("Employees in array:", employees.length, employees);

        // 3. Append form input values and create a delete button to DOM
        $('#employee-table').append(`
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td class="annual-salary-total">$${Number(annualSalary)}</td>
        <td><button id="delete-button">Delete</button></td>
    </tr>
    `);

        // 4. Clear inputs of form
        $('#employee-first-name').val('');
        $('#employee-last-name').val('');
        $('#employee-id-number').val('');
        $('#employee-job-title').val('');
        $('#employee-annual-salary').val('');

        // 4. Run monthlyCostCalculator
        monthlyCostCalculator();
    } // end else: running rest of function

} // end storeEmplyeeData

// Function to delete employee data row in table
function deleteButton() {
    console.log('Deleted employee.');

    // Removing the row that was created using
    $(this).parent().parent().remove();

    // Run function adjustMonthlyCost that will subtract from the total salaray
    adjustMonthlyCost();
} // end deleteButton

// Function for calculating monthly cost of all employees' annual salary and display it on DOM
function monthlyCostCalculator() {

    // 1. Creating totalSalary variable for sum of all employee salaries
    let totalSalary = 0;

    // 2. Looping though global employees array. For each employee in the employees array, push the salary amount to totalSalary variable
    // - If there is a NaN for salary, delete employee
    for (let employee of employees) {
        totalSalary += employee.annualSalary;
        // Conditonal to remove employee object in employees global array when annual salary value NaN is entered
        for (const employee of employees) {
            if (isNaN(employee.annualSalary) || isNaN(employee.idNumber)) {
                // Created variable to target index of employees in for loop
                let index = employees.indexOf(employee);
                employees.splice(index, 1);
            } // end NaN conditional
        } // end for of loop
    } // end global employees loop
    console.log("Sum of all employee salaries is:", totalSalary);

    // 3. After they are added, new variable of added salaries is divided by tweleve
    let totalMonthlyCost = totalSalary / 12;
    console.log('Total monthly cost is:', Number(totalMonthlyCost));

    /* Conditionals: 
            - For for annual salary or ID number input that is not an integer
                - Using new syntax that I learned about to check if annualSalary is a valid number. Using isNaN method */
    if (isNaN(totalMonthlyCost)) {
        // The input value of annual salary isn't an integer, don't add to total monthly cost element
        return; // Exit function
    } // end 

    // 4. Appened the remainder of those numbers to total monthly cost element in DOM
    $('#total-monthly-cost-amount').text(totalMonthlyCost);

    // 4. If the total monthly cost exceeds $20,000, adding a red background color to the total monthly cost
    if (totalMonthlyCost > 20000) {
        $('#total-monthly-cost').addClass('exeeding-budget');
    } // end red background conditional

} // end monthlyCostCalculator

// - End Functions -