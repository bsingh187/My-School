export namespace SchoolTypes {

    export interface SessionsType {
        id: any;
        start_date: string;
        end_date: string;
        description: string;
        is_default: boolean;
      }

      export interface SchoolType{
        id: any;
        logo_url: string;
        name: string;
        address: string;
        country: string;
        state: string;
        city: string;
        contact_person: string;
        email: string;
        phone: string;
        landline: string;
        school_url: string;
        affiliated_to: string;
        affiliation_number: string;
        sub_domain: string;
      }

    }