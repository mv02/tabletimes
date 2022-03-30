import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Subject from 'App/Models/Subject';

export default class SubjectSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await Subject.updateOrCreateMany(
      ['name', 'ownerId'],
      [
        { name: 'Český jazyk a literatura', short: 'čj', color: 'f53311', ownerId: 1 },
        { name: 'Seminář z českého jazyka', short: 'sčj', color: 'd91b0d', ownerId: 1 },
        { name: 'Matematika', short: 'm', color: '1262db', ownerId: 1 },
        { name: 'Anglický jazyk', short: 'aj', color: 'f2189b', ownerId: 1 },
        { name: 'Konverzace v anglickém jazyce', short: 'kaj', color: 'cc087e', ownerId: 1 },
        { name: 'Ekonomika', short: 'ekn', color: '28b315', ownerId: 1 },
        { name: 'Německý jazyk', short: 'nj', color: 'ffd900', ownerId: 1 },
        { name: 'Tělesná výchova', short: 'tv', color: '7d757d', ownerId: 1 },
        { name: 'Základy společenských věd', short: 'zsv', color: '0eed12', ownerId: 1 },
        { name: 'Programování', short: 'prg', color: '2008bf', ownerId: 1 },
        { name: 'Operační systémy', short: 'os', color: '8a5301', ownerId: 1 },
        { name: 'Praktická cvičení', short: 'pc', color: 'd49d4c', ownerId: 1 },
        { name: 'Aplikační software', short: 'as', color: '42eddf', ownerId: 1 },
        { name: 'Španělský jazyk', short: 'šj', color: 'f77902', ownerId: 1 },
        { name: 'Zeměpis', short: 'z', color: '009dff', ownerId: 1 },
        { name: 'Hardware', short: 'hw', color: 'b03703', ownerId: 1 },
        { name: 'Fyzika', short: 'f', color: '7300d1', ownerId: 1 },
        { name: 'Přírodní vědy', short: 'pv', color: '168500', ownerId: 1 },

        { name: 'Český jazyk a literatura', short: 'čj', color: 'b3e6ff', ownerId: 2 },
        { name: 'Matematika', short: 'm', color: 'ff80a1', ownerId: 2 },
        { name: 'Anglický jazyk', short: 'aj', color: 'ffc080', ownerId: 2 },
        { name: 'Německý jazyk', short: 'nj', color: '8ae0e0', ownerId: 2 },
        { name: 'Ruský jazyk', short: 'rj', color: 'ffcc80', ownerId: 2 },
        { name: 'Přírodopis', short: 'p', color: 'ff80ff', ownerId: 2 },
        { name: 'Chemie', short: 'ch', color: 'ffccb3', ownerId: 2 },
        { name: 'Zeměpis', short: 'z', color: 'e0a580', ownerId: 2 },
        { name: 'Dějepis', short: 'd', color: 'ffe6ff', ownerId: 2 },
        { name: 'Fyzika', short: 'f', color: 'e0e0e0', ownerId: 2 },
        { name: 'Výchova k občanství', short: 'vo', color: 'e6e6ff', ownerId: 2 },
        { name: 'Tělesná výchova', short: 'tv', color: '8099cc', ownerId: 2 },
        { name: 'Výtvarná výchova', short: 'vv', color: 'ffff80', ownerId: 2 },
        { name: 'Hudební výchova', short: 'hv', color: 'eeffcb', ownerId: 2 },
        { name: 'Informatika', short: 'inf', color: 'ffe0e0', ownerId: 2 },
      ]
    );
  }
}
