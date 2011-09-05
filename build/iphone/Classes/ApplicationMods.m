#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"smsdialog",@"name",@"com.omorandi",@"moduleid",@"0.2",@"version",@"87f37de9-e076-43cb-a2a0-a840e45af0d7",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
