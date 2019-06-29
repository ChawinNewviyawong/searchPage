import { Services } from '@angular/core/src/view';

export interface Search {
    clientID: number;
    data: Data;
    transaction: Transaction;
}

export interface Data {
    customerData: CustomerData;
    licenseData: LicenseData;
}

export interface LicenseData {
    Licenses: License[];
}

export interface License {
    properties: Properties;
    file: string;
    LicenseNo: string;
    LicenseTypeId: string;
    LicenseGroupTypeId: string;
    EffectiveYear: string;
    ExpireDate: string;
    IssueDate: string;
    Services: Service[];
    FileCondition: string;
    LicenseType: string;
}

export interface Properties {
    Services: Services[];
    FiledCondition: string;
    LicenseType: string;
}

export interface Service {
    ServiceId: string;
    ServiceName: string;
    Status: string;
}

export interface CustomerData {
    Customer: Customer;
}

export interface Customer {
    FileEvidences: FileEvidence[];
    Shareholders: Shareholder[];
    ContactAddress: string;
    ContactPersons: ContactPerson[];
    Committees: Committee[];
    RegisterAddress: string;
    JuristicNo: string;
    TaxId: string;
    Name: string;
}

export interface FileEvidence {
    type: string;
    fileName: string;
    file: string;
}

export interface Shareholder {
    IdCard: string;
    Name: string;
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

export interface Transaction {
    blockHash: string;
    transactionHash: string;
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