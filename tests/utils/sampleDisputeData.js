/* sample data used by tests/unit/services/render.js */

const {
  DisputeProcess: { WRITTEN, INPERSON, BYPHONE },
} = require('../../services/renderers/tool-configurations/shared/federal-student-loan-disputes');

const ids = {
  general: '11111111-1111-3333-1111-111111111111',
  student: '11111111-1111-1111-1111-111111111111',
  privateStudent: '11111111-1111-6666-1111-111111111111',
  creditReport: '11111111-1111-4444-1111-111111111111',
  taxOffsetReview: '11111111-1111-2222-1111-111111111111',
  wageGarnishment: '11111111-1111-1111-1111-111111111111',
};

const disputeOptions = {
  A: {
    data: {
      option: 'A',
      forms: {
        'personal-information-form': {
          'debt-amount': 1000,
          ssn: '123231234',
          city: 'Charleston',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '555 504 - 3438',
          state: 'South Carolina',
          phone2: '555 433 4324',
          address1: '123412341234 Long Street Name ABCDEFG Street',
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'school-state': 'California',
          'school-address': '1234 Long Address for a School Under Normal Conditions',
          'school-zip-code': '90434',
          'school-attended-to': '2016-12-31',
          'school-attended-from': '2013-11-30',
          employer: 'DC',
          employerCity: 'Palo Alto',
          employerPhone: '5017867932',
          employerState: 'California',
          employmentDate: '2017-12-01',
          employerZipCode: '94303',
          employerAddress1: '2727 Midtown Ct',
          'employment-radio-option': 'yes',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'Alexandre Guerra Marcondes',
      disputeProcess: WRITTEN,
      disputeConfirmFollowUp: true,
    },
  },
  B: {
    data: {
      option: 'B',
      forms: {
        'personal-information-form': {
          ssn: '123121234',
          city: 'Charleston',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5551233233',
          state: 'South Carolina',
          phone2: '555 433 4324',
          address1: 'San Francisco, CA, 94120',
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'school-state': 'Alaska',
          'school-address': '1234 Long Address for a School Under Normal Conditions',
          'school-zip-code': '90434',
          'school-attended-to': '2015-11-30',
          'school-attended-from': '2011-11-30',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: INPERSON,
      disputeProcessCity: 'San Francisco',
      disputeConfirmFollowUp: true,
    },
  },
  CasStudent: {
    data: {
      option: 'C',

      forms: {
        'personal-information-form': {
          ssn: '123231234',
          city: 'Charleston',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5555043438',
          state: 'South Carolina',
          phone2: '',
          address1: '123412341234 Long Street Name',
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'atb-have-ged': 'no',
          'school-state': 'Iowa',
          'school-address': '1234 Long Address Or is it',
          'atb-applying-as': 'no',
          'atb-attended-at': 'yes',
          'atb-enrolled-at': '2016-12-01',
          'atb-school-date': '2017-12-01',
          'school-zip-code': '90434',
          'atb-received-ged': 'no',
          'atb-entrance-exam': 'yes',
          'atb-entrance-exam-name': 'A bad test',
          'atb-entrance-exam-score': '100',
          'atb-attended-where': 'yes',
          'school-attended-to': '2017-11-01',
          'atb-complete-credit': 'no',
          'atb-program-of-study': 'Religious Studies',
          'school-attended-from': '2015-11-01',
          'atb-remedial-program-completed': 'no',
          'atb-entrance-exam-improper': 'yes',
          'atb-entrance-exam-improper-explain': 'The proctor was drunk',
          'atb-entrance-exam-radio-option': 'no',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: WRITTEN,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  CasParent: {
    data: {
      option: 'C',

      forms: {
        'personal-information-form': {
          ssn: '123231234',
          city: 'Charleston',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5555043438',
          state: 'South Carolina',
          phone2: '',
          address1: '123412341234 Long Street Name',
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'atb-have-ged': 'no',
          'school-state': 'Iowa',
          'school-address': '1234 Long Address Or is it',
          'atb-applying-as': 'yes',
          'atb-student-name': 'Soren Kierkegaard',
          'atb-student-ssn': '123-12-1234',
          'atb-attended-at': 'yes',
          'atb-enrolled-at': '2016-12-01',
          'atb-school-date': '2017-12-01',
          'school-zip-code': '90434',
          'atb-received-ged': 'no',
          'atb-entrance-exam': 'yes',
          'atb-entrance-exam-name': 'A bad test',
          'atb-entrance-exam-score': '100',
          'atb-attended-where': 'yes',
          'school-attended-to': '2017-11-01',
          'atb-complete-credit': 'no',
          'atb-program-of-study': 'Religious Studies',
          'school-attended-from': '2015-11-01',
          'atb-remedial-program-completed': 'no',
          'atb-entrance-exam-improper': 'yes',
          'atb-entrance-exam-improper-explain': 'The proctor was drunk',
          'atb-entrance-exam-radio-option': 'no',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: WRITTEN,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  CwithSupporter: {
    data: {
      option: 'C',

      forms: {
        'personal-information-form': {
          ssn: '123231234',
          city: 'Charleston',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5555043438',
          state: 'South Carolina',
          phone2: '',
          address1: '123412341234 Long Street Name',
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'atb-have-ged': 'no',
          'school-state': 'Iowa',
          'school-address': '1234 Long Address Or is it',
          'atb-applying-as': 'yes',
          'atb-student-name': 'Soren Kierkegaard',
          'atb-student-ssn': '123-12-1234',
          'atb-attended-at': 'yes',
          'atb-enrolled-at': '2016-12-01',
          'atb-school-date': '2017-12-01',
          'school-zip-code': '90434',
          'atb-received-ged': 'no',
          'atb-entrance-exam': 'yes',
          'atb-entrance-exam-name': 'A bad test',
          'atb-entrance-exam-score': '100',
          'atb-attended-where': 'yes',
          'school-attended-to': '2017-11-01',
          'atb-complete-credit': 'no',
          'atb-program-of-study': 'Religious Studies',
          'school-attended-from': '2015-11-01',
          'atb-remedial-program-completed': 'no',
          'atb-entrance-exam-improper': 'yes',
          'atb-entrance-exam-improper-explain': 'The proctor was drunk',
          'atb-entrance-exam-radio-option': 'yes',
          'atb-entrance-exam-supporter-city': 'Clemson',
          'atb-entrance-exam-supporter-name': 'Gregory',
          'atb-entrance-exam-supporter-phone': '973-329-9944',
          'atb-entrance-exam-supporter-state': 'Bogus State That is not SC',
          'atb-entrance-exam-supporter-address': '392 College Avenue',
          'atb-entrance-exam-supporter-zip-code': '29660',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: WRITTEN,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  DasParent: {
    data: {
      option: 'D',

      forms: {
        'personal-information-form': {
          ssn: '123121234',
          city: 'Washington',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5551233233',
          state: 'Alabama',
          phone2: '',
          address1: '133333 Sessions Ave.',
          'atbd-law': "392 § 94 - It's clear if you read it",
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'atbd-inform': 'yes',
          'school-city': 'San Francisco',
          'atbd-option5': 'yes',
          'school-state': 'Alabama',
          'school-address': '1234 Long Address for a School Under Normal Conditions',
          'school-zip-code': '90434',
          'atbd-applying-as': 'no',
          'atbd-option5-text': 'Some other madenning reason',
          'school-attended-to': '2017-12-03',
          'school-attended-from': '2012-11-02',
          'atbd-program-of-study': 'Philosophy',
          'atbd-reason-not-to-benefit': 'no',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: BYPHONE,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  DasStudent: {
    data: {
      option: 'D',

      forms: {
        'personal-information-form': {
          ssn: '123121234',
          city: 'Washington',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5551233233',
          state: 'Alabama',
          phone2: '',
          address1: '133333 Sessions Ave.',
          'atbd-law': "392 § 94 - It's clear if you read it",
          'zip-code': '29403',
          schoolName: 'University of Phoenix',
          'atbd-inform': 'yes',
          'school-city': 'San Francisco',
          'atbd-option5': 'yes',
          'school-state': 'Alabama',
          'school-address': '1234 Long Address for a School Under Normal Conditions',
          'school-zip-code': '90434',
          'atbd-applying-as': 'yes',
          'atbd-student-ssn': '125-34-2356',
          'atbd-option5-text': 'Some other madenning reason',
          'atbd-student-name': 'Vonnogut, Kurt, ?',
          'school-attended-to': '2017-12-03',
          'school-attended-from': '2012-11-02',
          'atbd-program-of-study': 'Philosophy',
          'atbd-reason-not-to-benefit': 'no',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcess: BYPHONE,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  EasStudent: {
    data: {
      option: 'E',
      forms: {
        'personal-information-form': {
          ssn: '123231234',
          city: 'Washington',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5551233233',
          state: 'Alabama',
          phone2: '435-545-2222',
          address1: '133333 Sessions Ave.',
          'zip-code': '29403',
          'fc-explain': 'This is an explanation',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'school-state': 'Iowa',
          'fc-applying-as': 'no',
          'fc-documents-a': 'yes',
          'fc-documents-b': 'yes',
          'fc-documents-c': 'yes',
          'school-address': '1234 Long Address Or is it',
          'school-zip-code': '90434',
          'fc-tuition-payment': "Money from the gov't",
          'school-attended-to': '2017-12-03',
          'school-attended-from': '2016-12-03',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcessCity: 'Atlanta',
      disputeProcess: INPERSON,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
  EasParent: {
    data: {
      option: 'E',
      forms: {
        'personal-information-form': {
          ssn: '123231234',
          city: 'Washington',
          name: 'Test Dispute Render User Name',
          email: 'fdsa@fdsa.net',
          phone: '5551233233',
          state: 'Alabama',
          phone2: '435-545-2222',
          address1: '133333 Sessions Ave.',
          'zip-code': '29403',
          'fc-explain': 'This is an explanation',
          schoolName: 'University of Phoenix',
          'school-city': 'San Francisco',
          'school-state': 'Iowa',
          'fc-applying-as': 'yes',
          'fc-student-name': 'FC Student Name',
          'fc-student-ssn': '111111111',
          'fc-documents-d': 'yes',
          'fc-documents-e': 'yes',
          'fc-documents-f': 'yes',
          'fc-documents-g': 'yes',
          'school-address': '1234 Long Address Or is it',
          'school-zip-code': '90434',
          'fc-tuition-payment': "Money from the gov't",
          'school-attended-to': '2017-12-03',
          'school-attended-from': '2016-12-03',
          'ffel-loan-radio-option': 'no',
        },
      },
      signature: 'This is a SIGNATURE',
      attachments: [],
      disputeProcessCity: 'Atlanta',
      disputeProcess: INPERSON,
      disputeConfirmFollowUp: true,
    },
    docTemplates: [1, 1],
  },
};

const assignDisputeToolIds = disputeToolId =>
  Object.keys(disputeOptions).reduce(
    (acc, option) => ({
      ...acc,
      [option]: { disputeToolId, ...disputeOptions[option] },
    }),
    {},
  );

module.exports = {
  generalDebtDispute: {
    disputeToolId: ids.general,
    data: {
      forms: {
        'personal-information-form': {
          city: 'Test Dispute Render City',
          name: 'Test Dispute Render User Name',
          state: 'South Carolina',
          address: 'Test Dispute Render Address1',
          'zip-code': '29403',
          'agency-city': 'Test Dispute Render Agency City',
          'agency-name': 'Test Dispute Render Agency Name',
          'agency-state': 'The District of Columbia',
          'agency-address': 'Test Dispute Render Agency Address1',
          'agency-zip-code': '29999',
          'letter-or-phonecall': 'letter',
        },
      },
      option: 'none',
      signature: 'TDC',
    },
  },

  privateStudentLoanDispute: {
    notDefaulted: {
      disputeToolId: ids.privateStudent,
      data: {
        forms: {
          'personal-information-form': {
            city: 'Charleston',
            name: 'Alexandre Guerra Marcondes',
            state: 'South Carolina',
            address: '123 A B C Street',
            'zip-code': '29403',
            'firm-city': 'San Francisco',
            'firm-name': 'Private Student Loan Collection Agency',
            'firm-state': 'Alabama',
            'firm-address': 'I<3Debt St.',
            'firm-zip-code': '99243',
            'account-number': '12341251234',
            'last-correspondence-date': '2012-02-24',
            'is-debt-in-default': 'no',
          },
        },
        option: 'none',
        signature: 'TDC',
        disputeConfirmFollowUp: true,
      },
    },
    defaulted: {
      disputeToolId: ids.privateStudent,
      data: {
        forms: {
          'personal-information-form': {
            city: 'Charleston',
            name: 'Alexandre Guerra Marcondes',
            state: 'South Carolina',
            address: '123 A B C Street',
            'zip-code': '29403',
            'firm-city': 'San Francisco',
            'firm-name': 'Private Student Loan Collection Agency',
            'firm-state': 'Alabama',
            'firm-address': 'I<3Debt St.',
            'firm-zip-code': '99243',
            'account-number': '12341251234',
            'last-correspondence-date': '2012-02-24',
            'is-debt-in-default': 'yes',
          },
        },
        option: 'none',
        signature: 'TDC',
        disputeConfirmFollowUp: true,
      },
    },
  },

  creditReportDispute: {
    disputeToolId: ids.creditReport,
    data: {
      forms: {
        'personal-information-form': {
          dob: '1985-09-20',
          ssn: '123231234',
          city: 'Charleston',
          name: 'Alexandre Guerra Marcondes',
          email: 'asdf@asdf.com',
          phone: '5551231234',
          state: 'South Carolina',
          address: '123 A B C Street',
          agencies: ['Experian', 'Equifax', 'TransUnion'],
          'zip-code': '29403',
        },
      },
      option: 'none',
      signature: 'TDC',
      attachments: [],
      disputeConfirmFollowUp: true,
    },
  },

  taxOffsetReviews: assignDisputeToolIds(ids.taxOffsetReview),

  wageGarnishmentDisputes: assignDisputeToolIds(ids.wageGarnishment),
};
