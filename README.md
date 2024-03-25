# Online Learning Management System

This repository is a submission for the [TypeScript Smart Contract 101](https://dacade.org/communities/icp/challenges/256f0a1c-5f4f-495f-a1b3-90559ab3c51f) challenge by the Internet Computer community on [Dacade](https://dacade.org/).

## Overview

This project is a canister implementation for the Internet Computer Protocol (ICP), designed to create Learn Management System (LMS) such as udemy. 
It allows users to list , add, edit and delete for below objects:
1. course
2. instructor
3. student
4. enroll course

### Roles and functionalities

The canister is designed with a multi-role LMS to facilitate various operations and interactions within the LMS. Below are the roles defined within the system and the functionalities assigned to each.

#### Admin
- **Add, edit, delete instructor**: The Admin can add new users as instructor.
- **Approve or reject**: The Admin can approve or reject course submitted by instructor.

#### Instructor

- **Add, edit, delete, submit course**: The Instructor can create a new course and submit.
- **Add, edit, delete lesson**: The Instructor can add a new lesson to a course.


#### Visitor

- **List Courses**: Visitor can list Courses.
- **Enroll Course**: Visitor can enroll course.

## Getting started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js (v20 or later)
- DFX (v0.16.0 or later)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/wesleychong21/online-course-icp-canister
```

2. Navigate to the project directory:

```bash
cd online-course-icp-canister
```

3. `dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

```bash
npm run dfx_install
```

### Quickstart

Install dependencies, create identities, start a replica, and deploy a canister:

```bash
npm run canister_setup
```

### Interacting With Canister

The `package.json` file contains several commands starting with `canister_call` that can be used to interact with the canister.

### Tear Down

Uninstall the canister, stop the replica, remove identities, and remove dependencies:

```bash
npm run clean_state
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
