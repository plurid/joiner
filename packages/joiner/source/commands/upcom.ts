import updateCommand from './update';
import patchCommand from './patch';
import commitCommand from './commit';



const upcomCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await patchCommand(packageName, configurationFile, 'patch');
    await commitCommand(packageName, configurationFile);

    console.log(`\n\tUpcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}


export default upcomCommand;
