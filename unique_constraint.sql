-- Lisa unikaalsuse piirang, et tagada, et sequence_number ja line_id kombinatsioon on unikaalne
alter table `routes`
    add constraint routes_pk
        unique (sequence_number, line_id);