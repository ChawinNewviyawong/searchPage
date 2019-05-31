export interface Response {
    clientID: number;
    data: Data;
    transaction: Transaction;
}

export interface Transaction {
    blockHash: string;
    transactionHash: string;
}

export interface Data {
    customerData: CustomerData;
    licenseData: LicenseData;
    file: string;
}

export interface LicenseData {
    Licenses: License[];
    Customer: string;
}

export interface License {
    LicenseNo: string;
    EffectiveYear: string;
    IssueDate: string;
    ExpireDate: string;
    LicenseTypeId: string;
    LicenseGroupTypeId: string;
    LicenseType: string;
    Services: Service[];
    FileCondition: string;
    FiledCondition: string;
}

export interface Service {
    ServiceId: string;
    ServiceName: string;
    Status: string;
}

export interface CustomerData {
    Customer: Customer;
    companyName: string;
}

export interface Customer {
    JuristicNo: string;
    Name: string;
    Committees: Committee[];
    Shareholders: Committee[];
    TaxId: string;
    RegisterAddress: string;
    ContactAddress: string;
    ContactPersons: ContactPerson[];
}

export interface ContactPerson {
    Name: string;
    Telephone: string;
    Email: string;
}

export interface Committee {
    IdCard: string;
    Name: string;
}

export interface SearchTable {
    // No;
    JuristicNo: string;
    CompanyName: string;
    LicenseGroupType: string;
    LicenseType: string;
    LicenseNo: string;
    Service: string;
    EffectiveYear: string;
    IssueDate: string;
    ExpireDate: string;
    Condition: string;
}