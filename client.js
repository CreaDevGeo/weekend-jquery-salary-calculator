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

✅  - Create an input form that collects employee first name, last name, ID number, job title, annual salary.
✅  - Make a 'Submit' button that collects the form information, stores the information to calculate monthly costs, appends information to the DOM and clears the input fields. 
    - Using the stored information, calculate monthly costs and append this to the to DOM. If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
    - Create a delete button that removes an employee from the DOM. 
        - For Base mode, it does not need to remove that Employee's salary from the reported total.

*/

$(document).ready(readyNow);

// Function that on DOM load, runs other functions
function readyNow() {
    
    // Event listener for submit button: On click of submit button, run storeEmployeeData
    $('#submit-button').on('click', storeEmployeeData);

    // Event delegation for delete button that was created
    $('#employee-table').on('click', '#delete-button', deleteButton)
} // end readyNow

// Function to: store employee info inputs, append inputs to table on DOM, create a delete header on table and button, clear input field, run function monthlyCostCalculator
function storeEmployeeData(event) {
    console.log('Storing employee data');
    
    // On event:
    // Cancel reloading of DOM
    event.preventDefault()


    // 1. Store form input field values
    let firstName = $('#employee-first-name').val()
    let lastName = $('#employee-last-name').val()
    let idNuber = $('#employee-id-number').val()
    let jobTitle = $('#employee-job-title').val()
    let annualSalary = $('#employee-annual-salary').val()

    // Conditional: 
    // For ID number shorter than 4 or longer than 6
    // For Empty input fields, dont add data and row to table

    // Testing
    console.log('Added to table.');
    console.log('Employee first name:', firstName);
    console.log('Employee last name:', lastName);
    console.log('Employee id number:', Number(idNuber));
    console.log('Employee job title:', jobTitle);
    console.log('Employee annual salary:', Number(annualSalary));


    // 2. Append form input values and create a delete header and button to DOM
    $('#employee-table').append(`
    <tbody>
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNuber}</td>
        <td>${jobTitle}</td>
        <td>$${Number(annualSalary)}</td>
        <td><button id="delete-button">Delete</button></td>
    </tr>
    </tbody>
    `);
    
    // 3. Clear inputs of form
    // $('#employee-first-name').val('');
    // $('#employee-last-name').val('');
    // $('#employee-id-number').val('');
    // $('#employee-job-title').val('');
    // $('#employee-annual-salary').val('');
    
    // 4. Run monthlyCostCalculator

    // 5. Delete Button
    // Event listener: On click of delete button that was appended, run deleteButton
   

} // end storeEmplyeeData

// Function to delete employee data row in table
function deleteButton() {
     // Event delegation

} // end deleteButton

// Function for calculating monthly cost of all employees' annual salary and display it on DOM
// function monthlyCostCalculator()